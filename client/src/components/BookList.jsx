import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(id);
                fetchBooks();
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const handleSortChange = (e) => {
        const [field, direction] = e.target.value.split('-');
        setSortField(field);
        setSortDirection(direction);
    };

    const sortedBooks = [...books].sort((a, b) => {
        const aValue = sortField === 'title' ? a.title : a.publishYear;
        const bValue = sortField === 'title' ? b.title : b.publishYear;

        if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredBooks = sortedBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.Author && `${book.Author.firstName} ${book.Author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="book-list">
            <div className="controls">
                <Link to={`/books/new`} className="btn">Add New Book</Link>

                <div className="sort-search-container">
                    <select
                        value={`${sortField}-${sortDirection}`}
                        onChange={handleSortChange}
                        className="sort-select"
                    >
                        <option value="title-asc">Название (А-Я)</option>
                        <option value="title-desc">Название (Я-А)</option>
                        <option value="publishYear-asc">Год (Сначала старые)</option>
                        <option value="publishYear-desc">Год (Сначала новые)</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.Author?.firstName} {book.Author?.lastName}</td>
                        <td>{book.Genre?.name}</td>
                        <td>{book.publishYear}</td>
                        <td>
                            <Link to={`/books/edit/${book.id}`} className="btn">Edit</Link>
                            <button onClick={() => handleDelete(book.id)} className="btn danger">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;