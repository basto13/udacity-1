import { Component } from 'react';
import { Link } from 'react-router-dom'
import Booklist from './Booklist';
import * as BooksAPI from './BooksApi'

class SearchBook extends Component {
    state = {
        query: '',
        books: []
    }

    updateQuery = (event) => {
        const { booksOnShelves } = this.props
        const newSearch = event.target.value;
        this.setState(() => ({ query: newSearch }));
        if (newSearch) {
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