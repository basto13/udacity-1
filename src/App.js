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

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books })
  }

  changeShelf = (newShelf, currentBook) => {
    this.setState(previousState => {
      currentBook.shelf = newShelf
      if (!previousState.books.some(book => book.id === currentBook.id)) {
        return { books: previousState.books.concat(currentBook) }
      }
      return {books: previousState.books}

    });
    BooksAPI.update(currentBook, newShelf)
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
