import React, { Component } from "react";

class Books extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.BooksList.length > 0 &&
          this.props.shelf &&
          this.props.BooksList.filter(
            (book) => book.shelf === this.props.shelf
          ).map((book) => {
            console.table(book);
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        onChange={(e) => {
                          this.props.updateshelf(book, e.target.value);
                          console.log("target", e.target.value);
                        }}
                        value={this.props.shelf}
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
                  {book.authors.map((author) => (
                    <div className="book-authors" key={book.id}>
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
