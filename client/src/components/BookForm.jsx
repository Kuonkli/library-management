import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, createBook, updateBook, getAuthors, getGenres } from '../services/api';

const BookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        publishYear: '',
        isbn: '',
        quantityInStock: 0,
        authorId: '',
        genreId: ''
    });
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [authorsRes, genresRes] = await Promise.all([getAuthors(), getGenres()]);
                setAuthors(authorsRes.data);
                setGenres(genresRes.data);

                if (id) {
                    const bookRes = await getBook(id);
                    const fetchedBook = bookRes.data;

                    setBook({
                        title: fetchedBook.title,
                        publishYear: fetchedBook.publishYear || '',
                        isbn: fetchedBook.isbn || '',
                        quantityInStock: fetchedBook.quantityInStock || 0,
                        authorId: fetchedBook.author_id || '',
                        genreId: fetchedBook.genre_id || ''
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({
            ...prev,
            [name]: name === 'quantityInStock' ? parseInt(value, 10) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const preparedBook = {
                title: book.title,
                publishYear: parseInt(book.publishYear, 10),
                isbn: book.isbn,
                quantityInStock: parseInt(book.quantityInStock, 10),
                author_id: parseInt(book.authorId, 10),
                genre_id: parseInt(book.genreId, 10)
            };

            if (id) {
                await updateBook(id, preparedBook);
            } else {
                await createBook(preparedBook);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving book:', error.response ? error.response.data : error.message);
        }
    };


    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="book-form">
            <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Author:</label>
                    <select
                        name="authorId"
                        value={book.authorId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Author</option>
                        {authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.firstName} {author.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Genre:</label>
                    <select
                        name="genreId"
                        value={book.genreId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Genre</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Publish Year:</label>
                    <input
                        type="number"
                        name="publishYear"
                        value={book.publishYear}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>ISBN:</label>
                    <input
                        type="text"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Quantity in Stock:</label>
                    <input
                        type="number"
                        name="quantityInStock"
                        value={book.quantityInStock}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                <button type="submit" className="btn primary">
                    {id ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default BookForm;
