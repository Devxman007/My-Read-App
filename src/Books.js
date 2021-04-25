import React, { Component } from "react";
import { LIST_OPTIONS } from "./Search";

class Books extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.BooksList.length > 0 &&
          this.props.shelf &&
          this.props.BooksList.filter(
            (book) => book.shelf === this.props.shelf
          ).map((book) => {
            return (
              <li key={book.id}>
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
                          this.props.updateshelf(book, e.target.value);

                          this.setState({ value: e.target.value });
                        }}
                        value={this.props.shelf}
                      >
                        {LIST_OPTIONS.map((option, index) => {
                          return (
                            <option
                              key={index}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors.map((author, index) => (
                    <div className="book-authors" key={"author" + index}>
                      {author}
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
      </ol>
    );
  }
}

export default Books;
