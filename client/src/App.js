import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BooksPage from './pages/BooksPage';
import BookForm from './components/BookForm';
import AuthorsPage from './pages/AuthorsPage';
import AuthorForm from './components/AuthorForm';
import GenresPage from './pages/GenresPage';
import GenreForm from './components/GenreForm';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <main className="content">
                    <Routes>
                        {/* Маршруты для книг */}
                        <Route path="/" element={<BooksPage />} />
                        <Route path="/books/new" element={<BookForm />} />
                        <Route path="/books/edit/:id" element={<BookForm />} />

                        {/* Маршруты для авторов */}
                        <Route path="/authors" element={<AuthorsPage />} />
                        <Route path="/authors/new" element={<AuthorForm />} />
                        <Route path="/authors/edit/:id" element={<AuthorForm />} />

                        {/* Маршруты для жанров */}
                        <Route path="/genres" element={<GenresPage />} />
                        <Route path="/genres/new" element={<GenreForm />} />
                        <Route path="/genres/edit/:id" element={<GenreForm />} />

                        {/* Резервный маршрут для 404 */}
                        <Route path="*" element={<div>Page not found</div>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;