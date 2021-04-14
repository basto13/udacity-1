import { Component } from 'react';
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom'

const shelves = ["currentlyReading", "wantToRead", 'read'];

class Bookshelves extends Component {

    render() {
        const { books, onChangeShelf } = this.props;
        return (
            <div className='app'>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className='list-book-content'>
                        <div className='bookshelf'>
                            {shelves.map(shelf => (
                                <BookShelf
                                    key={shelf}
                                    books={books}
                                    shelfId={shelf}
                                    onChangeShelf={onChangeShelf}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Link 
                to='/search'
                className="open-search">
                    <button>Add a book</button>
                </Link>
            </div>
        )
    }
}

export default Bookshelves;