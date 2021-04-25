import React, { Component } from "react";

class Shelf extends Component {
  render() {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">{this.props.Books}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;
