import React, { Component } from "react";

class Books extends Component {
  render() {
    return (
      <ol className="books-grid">
        {console.log(this.props.BooksList)}
        {this.props.BooksList.map((book) => book)
          .filter((b) => b.shefl === "currentlyReading")
          .map((a) => {
            console.log(a.shefl);
            return a.shefl;
          })}
        {this.props.BooksList.filter(
          (book) => book.shefl === "currentlyReading"
        ).map((book) => {
          return (
            <li>
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
                    <select>
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
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default Books;
