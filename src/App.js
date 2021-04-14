import './App.css';
import * as BooksAPI from './BooksApi'
import { Component } from 'react';
import Bookshelves from './Bookshelves';
import SearchBook from './SearchBook';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books: books })
      })
  }

  changeShelf = (newShelf, currentBook) => {
    const newBooks = this.state.books.filter(book => book !== currentBook);
    currentBook.shelf = newShelf;
    newBooks.push(currentBook)
    this.setState({ books: newBooks });
    BooksAPI.update(currentBook, currentBook.shelf)
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <div>
            <Bookshelves
              books={this.state.books}
              onChangeShelf={this.changeShelf}
            />
          </div>
        )} />
        <Route path='/search' render={() => 
        <SearchBook 
        booksOnShelves={this.state.books} 
        onChangeShelf={this.changeShelf}
        />} />
      </div>


    );
  }
}


export default App;
