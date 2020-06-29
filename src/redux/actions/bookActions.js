import * as types from "./actionTypes";
import * as bookApi from "../../api/bookApi";

export function createBook(book) {
  return { type: types.CREATE_BOOK, book };
}

export function loadBooksSuccess(books) {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}

export function createBookSuccess(book) {
  return { type: types.CREATE_BOOK_SUCCESS, book };
}

export function updateBookSuccess(book) {
  return { type: types.UPDATE_BOOK_SUCCESS, book };
}

// every thunk returns a function that accepts dispatch as an argument
export function loadBooks() {
  // redux thunk injects dispatch so we don't have to
  return dispatch => {
    return bookApi
      .getBooks()
      .then(books => {
        dispatch(loadBooksSuccess(books));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveBook(book) {
  // eslint-disable-next-line no-unused-vars
  return (dispatch, getState) => {
    return bookApi
      .saveBook(book)
      .then(savedBook => {
        // eslint-disable-next-line no-unused-expressions
        book.id
          ? dispatch(updateBookSuccess(savedBook))
          : dispatch(createBookSuccess(savedBook));
      })
      .catch(error => {
        throw error;
      });
  };
}
