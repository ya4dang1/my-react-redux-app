import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import * as BookActions from "../../redux/actions/bookActions";
import * as AuthorActions from "../../redux/actions/authorActions";
import BookForm from "./BookForm";
import { newBook } from "../../../tools/mockData";

export function ManageBookPage({
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        // eslint-disable-next-line no-alert
        alert("Loading books failed", error);
      });
    } else {
      // because loadBooks is run asynchronously, we need to setBook whenever there is props.book passed in
      setBook({ ...initialBook });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        // eslint-disable-next-line no-alert
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

  function formIsValid() {
    const { title, authorId, category } = book;
    const formErrors = {};

    if (!title) formErrors.title = "Title is required.";
    if (!authorId) formErrors.author = "Author is required.";
    if (!category) formErrors.category = "Category is required.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);
    saveBook(book)
      .then(() => {
        toast.success("Book saved.");
        history.push("/books");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || books.length === 0 ? (
    <Spinner />
  ) : (
    <BookForm
      book={book}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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
    slug && state.books.length > 0 && state.authors.length > 0
      ? getBookBySlug(state.books, slug)
      : newBook;
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
