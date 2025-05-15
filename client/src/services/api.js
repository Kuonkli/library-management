import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const getBooks = () => api.get('/books');
export const getBook = (id) => api.get(`/books/${id}`);
export const createBook = (bookData) => api.post('/books', bookData);
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);

export const getAuthors = () => api.get('/authors');
export const getGenres = () => api.get('/genres');

export const getAuthor = (id) => api.get(`/authors/${id}`);
export const createAuthor = (authorData) => api.post('/authors', authorData);
export const updateAuthor = (id, authorData) => api.put(`/authors/${id}`, authorData);
export const deleteAuthor = (id) => api.delete(`/authors/${id}`);

export const getGenre = (id) => api.get(`/genres/${id}`);
export const createGenre = (genreData) => api.post('/genres', genreData);
export const updateGenre = (id, genreData) => api.put(`/genres/${id}`, genreData);
export const deleteGenre = (id) => api.delete(`/genres/${id}`);