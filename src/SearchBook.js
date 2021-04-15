import { Component } from 'react';
import { Link } from 'react-router-dom'
import Booklist from './Booklist';
import * as BooksAPI from './BooksApi'

const searchOptions = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'].map((option) => option.toLowerCase())


class SearchBook extends Component {
    state = {
        query: '',
        books: []
    }

    updateQuery = (event) => {
        const { booksOnShelves } = this.props
        const newSearch = event.target.value;
        this.setState(() => ({ query: newSearch }));
        if (searchOptions.includes(newSearch.toLowerCase())) {
            BooksAPI.search(newSearch)
                .then(books => {
                    if (!books.error) {
                        this.findSimilarBooks(booksOnShelves, books)
                        this.setState({ books: books || [] })
                    }
                })
            }
        else {
                this.setState({ books: [] })
            }
    }

    findSimilarBooks = (booksOnShelves, searchBooks) => {
        if (searchBooks) {
            searchBooks.forEach(book => {
                const similar = booksOnShelves.find(addedBook => addedBook.id === book.id)
                if (similar) {
                    book.shelf = similar.shelf
                }
                else { book.shelf = "none" }
            })
        }
    }

    render() {
        const { onChangeShelf } = this.props
        const { query, books } = this.state
        return (
            <div>
                <div className='search-books-bar'>
                    <Link
                        className='close-search'
                        to='/'>
                        Close
                </Link>
                    <input
                        type='text'
                        placeholder='Search by title or author'
                        value={query}
                        onChange={this.updateQuery}
                    />
                </div>
                <Booklist className='search-books-results'
                    books={books}
                    onChangeShelf={onChangeShelf}
                />
            </div>


        )
    }
}

export default SearchBook;