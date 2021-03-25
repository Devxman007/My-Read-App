import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shefl from "./Shefl";
import Books from "./Books";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    Books: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      console.log(this.state.Books);
      this.setState(() => ({
        Books,
      }));
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Shefl
              title={"CurrentlyReading"}
              Books={
                <Books
                  shefl={"currentlyReading"}
                  BooksList={this.state.Books}
                />
              }
            />
            <Shefl
              title={"Want to read"}
              Books={
                <Books shefl={"wantToRead"} BooksList={this.state.Books} />
              }
            />
            <Shefl
              title={"Read"}
              Books={<Books shefl={"read"} BooksList={this.state.Books} />}
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
