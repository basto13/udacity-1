import { Component } from 'react';
import Booklist from './Booklist';

const getName = (id) => {
    switch (id) {
        case "currentlyReading":
            return "Currently Reading";
        case "wantToRead":
            return "Want to Read";
        case "read":
            return "Read";
        default:
            return "Unknown";
    }
}

class BookShelf extends Component {
    getBooklist = (books, shelfId) => {
        return books.filter(book => book.shelf === shelfId)
    }

    render() {
        const { books, shelfId, onChangeShelf } = this.props;

        return (
            <div>
                <hr />
                <h2 className='bookshelf-title'>
                    {getName(shelfId)}
                </h2>
                <Booklist
                    books={this.getBooklist(books, shelfId)}
                    onChangeShelf={onChangeShelf}
                />
            </div>
        )
    }
}

export default BookShelf;