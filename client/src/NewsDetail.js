import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsDetails } from './store/actions/newsActions';

function NewsDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { newsDetails, comments, loading, error } = useSelector(state => state.news);

    useEffect(() => {
        dispatch(fetchNewsDetails(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    const renderComments = (comments, level = 0) => {
        if (!comments) return null;

        return comments.map((comment) => (
            <div key={comment.id} className={`mt-2 ml-${level * 4} border-2 border-gray-400 p-3 rounded bg-gray-100`}>
                <p className="text-gray-600">{comment.text}</p>
                {comment.children && renderComments(comment.children, level + 1)}
            </div>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-2">{newsDetails?.title}</h1>
            <p className="text-gray-600">Author: {newsDetails?.by}</p>
            <p className="text-gray-600 mb-4">Date: {new Date(newsDetails?.time * 1000).toLocaleString()}</p>
            <div className="mt-8 border-t-4 border-gray-200 pt-4">
                <h3 className="text-2xl font-bold mb-2">Comments:{comments.length}</h3>
                <div className="border-2 p-3 rounded bg-white">
                    {renderComments(comments)}
                </div>
            </div>
        </div>
    );
}

export default NewsDetail;
