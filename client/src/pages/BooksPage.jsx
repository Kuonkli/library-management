import React from 'react';
import BookList from '../components/BookList';

const BooksPage = () => {
    return (
        <div className="page">
            <h1>Books Management</h1>
            <BookList />
        </div>
    );
};

export default BooksPage;