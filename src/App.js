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
    this.setState(previousState => {
      currentBook.shelf = newShelf
      if (!previousState.books.includes(currentBook)) {
        return { books: previousState.books.concat(currentBook) }
      }
      return {}

    });
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
