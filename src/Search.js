import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
  }
  state = {
    query: "",
    result: [],
    value: "none",
  };
  handleShelfValue = (event) => {
    this.setState(
      {
        value: event.target.value,
      },
      () => {
        console.log(this.state.value);
      }
    );
  };
  updateQuery(query) {
    this.setState({ query: query.toLowerCase() });
    if (query.length > 0) {
      BooksAPI.search(query).then((data) => {
        if (data.length > 0) {
          const returnedValue = data.filter(
            (book) =>
              book.title.toLowerCase().includes(query) ||
              book.authors.filter((author) =>
                author.toLowerCase().includes(query)
              )
          );
          if (returnedValue.length > 0) {
            this.setState({ result: returnedValue });
          }
        }
      });
    } else {
      console.log("Empty query");
    }
  }

  render() {
    const { showSearchPage, updateshelf } = this.props;
    const { query, result } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={showSearchPage}>
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
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => {
                this.updateQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {result.length > 0 && query.length > 0
              ? result.map((book, index) => {
                  console.log(book, "reso dayez");
                  return (
                    <li key={index}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`,
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              onChange={(e) => {
                                updateshelf(book, e.target.value);
                                this.handleShelfValue(e);
                              }}
                              value={this.state.value}
                            >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors.map((author, index) => (
                          <div className="book-authors" key={index}>
                            {author}
                          </div>
                        ))}
                      </div>
                    </li>
                  );
                })
              : console.log("emptyyyyyyyyyyyyy")}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
