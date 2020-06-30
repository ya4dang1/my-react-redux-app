import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookList = ({ books, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {books.map(book => {
        return (
          <tr key={book.id}>
            <td>
              <a
                className="btn btn-light"
                href={`http://pluralsight.com/books/${book.slug}`}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={`/book/${book.slug}`}>{book.title}</Link>
            </td>
            <td>{book.authorName}</td>
            <td>{book.category}</td>
            <td>
              <button
                type="button"
                className="btn btn-outline-danger delete-book"
                onClick={() => {
                  onDeleteClick(book);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default BookList;
