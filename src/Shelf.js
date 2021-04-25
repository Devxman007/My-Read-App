import React, { Component } from "react";
import PropTypes from "prop-types";

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
Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  Books: PropTypes.element.isRequired,
};

export default Shelf;
