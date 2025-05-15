import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthor, createAuthor, updateAuthor } from '../services/api';

const AuthorForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        country: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthor = async () => {
            if (id) {
                try {
                    const response = await getAuthor(id);
                    setAuthor(response.data);
                } catch (error) {
                    console.error('Error fetching author:', error);
                }
            }
            setLoading(false);
        };

        fetchAuthor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateAuthor(id, author);
            } else {
                await createAuthor(author);
            }
            navigate('/authors');
        } catch (error) {
            console.error('Error saving author:', error);
        }
    };

    if (loading && id) return <div className="loading">Loading...</div>;

    return (
        <div className="author-form">
            <h2>{id ? 'Edit Author' : 'Add New Author'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={author.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={author.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Birth Date:</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={author.birthDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={author.country}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn primary">
                    {id ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default AuthorForm;