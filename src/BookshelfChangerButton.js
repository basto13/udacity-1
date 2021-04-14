import React from 'react';

const BookshelfChangerButton = (props) => {
    const { book, onChangeShelf } = props;

    const changeShelf = (event) => {
        const newShelf = event.target.value;
        const currentBook = book;
        onChangeShelf(newShelf, currentBook)
    }

    return (
        <div className="book-shelf-changer">
            <select value={book.shelf} onChange={changeShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

export default BookshelfChangerButton;