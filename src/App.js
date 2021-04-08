import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";
import Books from "./Books";
import Search from "./Search";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.updateshelf = this.updateshelf.bind(this);

    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      Books: [],
      showSearchPage: false,
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState(() => ({
        Books,
      }));
    });
  }
  updateshelf(book, shelf) {
    BooksAPI.update(book, shelf).then((Books) => {
      console.log("BOOKS API", Books);
      console.log("BOOKS STATE", this.state.Books);
      const updatedBooks = this.state.Books.map((book) => {
        if (Books.currentlyReading.find((id) => id === book.id)) {
          return { ...book, shelf: "currentlyReading" };
        } else if (Books.read.find((id) => id === book.id)) {
          return { ...book, shelf: "read" };
        } else if (Books.wantToRead.find((id) => id === book.id)) {
          return { ...book, shelf: "wantToRead" };
        }
      });

      console.log("BOOKS updated", updatedBooks);
      this.setState(() => ({
        Books: updatedBooks,
      }));
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            showSearchPage={() => this.setState({ showSearchPage: false })}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Shelf
              title={"Currently Reading"}
              Books={
                <Books
                  shelf={"currentlyReading"}
                  BooksList={this.state.Books}
                  updateshelf={this.updateshelf}
                />
              }
            />
            <Shelf
              title={"Want to read"}
              Books={
                <Books
                  shelf={"wantToRead"}
                  BooksList={this.state.Books}
                  updateshelf={this.updateshelf}
                />
              }
            />
            <Shelf
              title={"Read"}
              Books={
                <Books
                  shelf={"read"}
                  BooksList={this.state.Books}
                  updateshelf={this.updateshelf}
                />
              }
            />

            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
