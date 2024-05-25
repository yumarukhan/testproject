const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const newsIds = response.data.slice(0, 20);
        const newsPromises = newsIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const newsItems = await Promise.all(newsPromises);
        res.json(newsItems.map(item => item.data));
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/api/news/:id', async (req, res) => {
    const newsId = req.params.id;
    try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
const fetchComment = async (commentId) => {
    try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
        const comment = response.data;
        if (comment.kids && comment.kids.length > 0) {
            const childComments = await Promise.all(comment.kids.map(fetchComment));
            comment.children = childComments;
        }
        return comment;
    } catch (error) {
        console.error('Error fetching comment:', error);
        return null;
    }
};

app.get('/api/news/:id/comments', async (req, res) => {
    const newsId = req.params.id;
    try {
        const newsItem = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`);
        if (newsItem.data.kids) {
            const comments = await Promise.all(newsItem.data.kids.map(fetchComment));
            res.json(comments);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).send(error.toString());
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});