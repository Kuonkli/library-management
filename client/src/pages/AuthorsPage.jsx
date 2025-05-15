import React from 'react';
import AuthorList from '../components/AuthorList';

const AuthorsPage = () => {
    return (
        <div className="page">
            <h1>Authors Management</h1>
            <AuthorList />
        </div>
    );
};

export default AuthorsPage;