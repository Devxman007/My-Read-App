import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";
import Books from "./Books";
import Search, { LIST_OPTIONS } from "./Search";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.updateshelf = this.updateshelf.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);

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

  getAllBooks() {
    BooksAPI.getAll().then((Books) => {
      this.setState(() => ({
        Books,
      }));
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  updateshelf(book, shelf) {
    BooksAPI.update(book, shelf).then((Books) => {
      const updatedBook = { ...book, shelf };

      if (this.state.Books.find((b) => b.id === book.id)) {
        this.setState((state) => ({
          Books: state.Books.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          ),
        }));
      } else {
        this.setState((state) => ({
          Books: [...state.Books, updatedBook],
        }));
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/search">
              <Search
                showSearchPage={() => {
                  this.setState({ showSearchPage: false });
                }}
                updateshelf={this.updateshelf}
                booksList={this.state.Books}
              />
            </Route>

            <Route exact path="/">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                {LIST_OPTIONS.filter((option) => option.toShow).map(
                  (o, index) => {
                    return (
                      <Shelf
                        key={index}
                        title={o.label}
                        Books={
                          <Books
                            shelf={o.value}
                            BooksList={this.state.Books}
                            updateshelf={this.updateshelf}
                          />
                        }
                      />
                    );
                  }
                )}

                <div className="open-search">
                  {
                    <Link to={"/search"}>
                      <button
                        onClick={() => {
                          this.setState({ showSearchPage: true });
                        }}
                      >
                        Add a book
                      </button>
                    </Link>
                  }
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
