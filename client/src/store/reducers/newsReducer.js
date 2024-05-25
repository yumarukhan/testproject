const initialState = {
    newsList: [],
    newsDetails: {},
    comments: [],
    loading: false,
    error: null,
};

function newsReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_NEWS_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_NEWS_SUCCESS':
            return { ...state, newsList: action.payload, loading: false };
        case 'FETCH_NEWS_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'FETCH_NEWS_DETAIL_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_NEWS_DETAIL_SUCCESS':
            return {
                ...state,
                newsDetails: action.payload.details,
                comments: action.payload.comments,
                loading: false
            };
        case 'FETCH_NEWS_DETAIL_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default newsReducer;
