import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNews } from './store/actions/newsActions'; // Ensure correct path

function NewsList() {
    const dispatch = useDispatch();
    const { newsList, loading, error } = useSelector(state => state.news);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(fetchNews());
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching news: {error}</p>;

    return (
        <div className="container mx-auto px-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRefresh}>Refresh News</button>
            {newsList.map(news => (
                <div key={news.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-5">
                    <Link to={`/news/${news.id}`}>
                        <div className="p-8">
                            <h3 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{news.title}</h3>
                            <p className="mt-2 text-gray-500">Author: {news.by}</p>
                            <p className="text-gray-500">Date: {new Date(news.time * 1000).toLocaleString()}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>

    );
}

export default NewsList;
