import React from 'react';
import BookshelfChangerButton from './BookshelfChangerButton';

const Book = (props) => {
    const { book, onChangeShelf } = props;

    const getAuthorsString = (bookAuthors) => {
        if (bookAuthors) {
            return bookAuthors.join(', ');
        }
        return '';
    }

    if (!book.imageLinks.thumbnail) {
        return null;
    }

    return (
        <li>
            <div className='book' key={book.title}>
                <div className='book-top'>
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div>
                        <BookshelfChangerButton book={book} onChangeShelf={onChangeShelf} />
                    </div>
                </div>
                <div className='book-title'>{book.title}</div>
                <div className='book-authors'>{getAuthorsString(book.authors)}</div>
            </div>

        </li>
    )
}


export default Book;