import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './NewsList';
import NewsDetail from './NewsDetail';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </Router>
      </Provider>
  );
}

export default App;
