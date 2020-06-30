import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import * as bookActions from "../../redux/actions/bookActions";
import * as authorActions from "../../redux/actions/authorActions";
import BookList from "./BookList";

class BooksPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      redirectToAddBookPage: false
    };
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.loadBooks().catch(error => {
      // eslint-disable-next-line no-alert
      alert("Loading books failed", error);
    });

    actions.loadAuthors().catch(error => {
      // eslint-disable-next-line no-alert
      alert("Loading authors failed", error);
    });
  }

  handleDeleteBook = async book => {
    const { actions } = this.props;
    toast.success("Book deleted");
    try {
      await actions.deleteBook(book);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  };

  render() {
    const { books, loading } = this.props;
    const { redirectToAddBookPage } = this.state;

    return (
      <>
        {redirectToAddBookPage && <Redirect to="/book" />}
        <h2>Books</h2>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <button
              type="button"
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-book"
              onClick={() => this.setState({ redirectToAddBookPage: true })}
            >
              Add Book
            </button>
            <BookList books={books} onDeleteClick={this.handleDeleteBook} />
          </>
        )}
      </>
    );
  }
}

BooksPage.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  books: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired
};

BooksPage.defaultProps = {
  books: []
};

function mapStateToProps(state) {
  return {
    books:
      state.authors.length === 0
        ? []
        : state.books.map(book => {
            return {
              ...book,
              authorName: state.authors.find(a => a.id === book.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadBooks: bindActionCreators(bookActions.loadBooks, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteBook: bindActionCreators(bookActions.deleteBook, dispatch)
    }
  };
}

// we omitted mapDispatchToProps, connect automatically add Dispatch as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
