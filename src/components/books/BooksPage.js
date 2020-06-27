import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as bookActions from "../../redux/actions/bookActions";

class BooksPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {
        title: ""
      }
    };
  }

  handleChange = event => {
    let { book } = this.state;
    book = { ...book, title: event.target.value };
    this.setState({ book });
  };

  handleSubmit = event => {
    const { actions } = this.props;
    const { book } = this.state;
    event.preventDefault();
    actions.createBook(book);
  };

  render() {
    const { books } = this.props;
    const { book } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Books</h2>
        <h3>Add Book</h3>
        <input type="text" onChange={this.handleChange} value={book.title} />

        <input type="submit" value="Save" />
        {books.map(c => (
          <div key={c.title}>{c.title}</div>
        ))}
      </form>
    );
  }
}

BooksPage.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  books: PropTypes.arrayOf(PropTypes.object)
};

BooksPage.defaultProps = {
  books: {}
};

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookActions, dispatch)
  };
}

// we omitted mapDispatchToProps, connect automatically add Dispatch as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
