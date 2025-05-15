import React, { useState, useEffect } from 'react';
import { getAuthors, deleteAuthor } from '../services/api';
import { Link } from 'react-router-dom';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await getAuthors();
            setAuthors(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            try {
                await deleteAuthor(id);
                fetchAuthors();
            } catch (error) {
                console.error('Error deleting author:', error);
            }
        }
    };

    const filteredAuthors = authors.filter(author =>
        `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="author-list">
            <div className="controls">
                <Link to="/authors/new" className="btn">Add New Author</Link>
                <input
                    type="text"
                    placeholder="Search authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Birth Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredAuthors.map(author => (
                    <tr key={author.id}>
                        <td>{author.firstName} {author.lastName}</td>
                        <td>{author.country}</td>
                        <td>{author.birthDate}</td>
                        <td>
                            <Link to={`/authors/edit/${author.id}`} className="btn">Edit</Link>
                            <button onClick={() => handleDelete(author.id)} className="btn danger">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuthorList;