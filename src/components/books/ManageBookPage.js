import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as BookActions from "../../redux/actions/bookActions";
import * as AuthorActions from "../../redux/actions/authorActions";
import BookForm from "./BookForm";
import { newBook } from "../../../tools/mockData";

function ManageBookPage({
  book: initialBook,
  books,
  authors,
  loadBooks,
  loadAuthors,
  saveBook,
  history
}) {
  const [book, setBook] = useState({ ...initialBook });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        alert("Loading books failed", error);
      });
    } else {
      // because loadBooks is run asynchronously, we need to setBook whenever there is props.book passed in
      setBook({ ...initialBook });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed", error);
      });
    }
  }, [initialBook]);

  // this handles all book inputs
  function handleChange(event) {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveBook(book).then(() => {
      history.push("/books");
    });
  }

  return (
    <BookForm
      book={book}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageBookPage.propTypes = {
  book: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  books: PropTypes.arrayOf(PropTypes.object),
  authors: PropTypes.arrayOf(PropTypes.object),
  loadBooks: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveBook: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

ManageBookPage.defaultProps = {
  books: [],
  authors: []
};

export function getBookBySlug(books, slug) {
  return books.find(book => book.slug === slug) || null;
}

// ownProps let us access the component's props. We can use this to read the URL data injected on props by React Router
function mapStateToProps(state, ownProps) {
  // The placeholder in React Route :slug is accessed here via ownProps.params.match.slug
  const { slug } = ownProps.match.params;
  const book =
    slug && state.books.length > 0 ? getBookBySlug(state.books, slug) : newBook;
  return {
    book,
    books: state.books,
    authors: state.authors
  };
}

// use object form dispatch to props
const mapDispatchToProps = {
  loadBooks: BookActions.loadBooks,
  loadAuthors: AuthorActions.loadAuthors,
  saveBook: BookActions.saveBook
};

// we omitted mapDispatchToProps, connect automatically add Dispatch as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ManageBookPage);
