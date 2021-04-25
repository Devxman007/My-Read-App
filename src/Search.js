import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

export const LIST_OPTIONS = [
  {
    value: "move",
    label: "Move to...",
    disabled: true,
  },
  {
    value: "currentlyReading",
    label: "Currently Reading",
    toShow: true,
  },
  {
    value: "wantToRead",
    label: "Want to Read",
    toShow: true,
  },
  {
    value: "read",
    label: "Read",
    toShow: true,
  },
  {
    value: "none",
    label: "None",
  },
];
class Search extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
  }
  state = {
    query: "",
    result: [],
  };

  updateQuery(query) {
    this.setState({ query: query });
    if (query.length > 0) {
      BooksAPI.search(query).then((data) => {
        if (data.length > 0) {
          const returnedValue = data.filter(
            (book) =>
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.authors.filter((author) =>
                author.toLowerCase().includes(query.toLowerCase())
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
    const { showSearchPage, updateshelf, booksList } = this.props;
    const { query, result } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={"/"}>
            <button className="close-search" onClick={showSearchPage}>
              Close
            </button>
          </Link>
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
            {result.length > 0 && query.length > 0 ? (
              result.map((book) => {
                const findBook = booksList.find((b) => b.id === book.id);
                console.log(findBook, "heloo");
                const bookShelf = findBook ? findBook.shelf : "none";
                return (
                  <li key={"bookid" + book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                              book.imageLinks && book.imageLinks.thumbnail
                                ? `url(${book.imageLinks.thumbnail})`
                                : "none",
                          }}
                        />

                        <div className="book-shelf-changer">
                          <select
                            onChange={(e) => {
                              updateshelf(book, e.target.value);
                            }}
                            value={bookShelf}
                          >
                            {LIST_OPTIONS.map((option, index) => (
                              <option
                                key={index}
                                value={option.value}
                                disabled={option.disabled}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      {book.authors &&
                        book.authors.map((author, index) => (
                          <div className="book-authors" key={"author" + index}>
                            {author}
                          </div>
                        ))}
                    </div>
                  </li>
                );
              })
            ) : (
              <li> type something in the search bar to see the result</li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
