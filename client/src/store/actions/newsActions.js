import axios from 'axios';

export const fetchNews = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_NEWS_START' });
        try {
            const response = await axios('http://localhost:3001/api/news');
            dispatch({ type: 'FETCH_NEWS_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_NEWS_ERROR', payload: error.message });
        }
    };
};


export const fetchNewsDetails = (id) => async dispatch => {
    dispatch({ type: 'FETCH_NEWS_DETAIL_START' });
    try {
        const response = await axios(`http://localhost:3001/api/news/${id}`);
        const commentsResponse = await axios(`http://localhost:3001/api/news/${id}/comments`);
        dispatch({
            type: 'FETCH_NEWS_DETAIL_SUCCESS',
            payload: {
                details: response.data,
                comments: commentsResponse.data
            }
        });
    } catch (error) {
        dispatch({ type: 'FETCH_NEWS_DETAIL_ERROR', payload: error.message });
    }
};