import React from 'react';
import Book from './Book'

const Booklist = (props) => {
    const { books, onChangeShelf } = props

    return (
        <div className='bookshelf-books'>
            <ol className="books-grid">
                {books.map((book, idx) =>
                    <Book
                        key={idx.toString()}
                        book={book}
                        onChangeShelf={onChangeShelf}
                    />
                )}
            </ol>
        </div>
    )
}


export default Booklist;