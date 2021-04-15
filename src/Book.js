import React from 'react';
import BookshelfChangerButton from './BookshelfChangerButton';

const Book = (props) => {
    const { book, onChangeShelf } = props;

    if (!book.imageLinks || !book.imageLinks.thumbnail) {
        return null;
    }

    return (
        <li>
            <div className='book'>
                <div className='book-top'>
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div>
                        <BookshelfChangerButton book={book} onChangeShelf={onChangeShelf} />
                    </div>
                </div>
                <div className='book-title'>{book.title}</div>
                <div className='book-authors'>{book.authors? book.authors.join(', ') : ''}</div>
            </div>

        </li>
    )
}


export default Book;