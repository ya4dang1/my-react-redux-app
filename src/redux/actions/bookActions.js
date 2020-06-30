import * as types from "./actionTypes";
import * as bookApi from "../../api/bookApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

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

export function deleteBookOptimistic(book) {
  return { type: types.DELETE_BOOK_OPTIMISTIC, book };
}

// every thunk returns a function that accepts dispatch as an argument
export function loadBooks() {
  // redux thunk injects dispatch so we don't have to
  return dispatch => {
    dispatch(beginApiCall());
    return bookApi
      .getBooks()
      .then(books => {
        dispatch(loadBooksSuccess(books));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveBook(book) {
  // eslint-disable-next-line no-unused-vars
  return (dispatch, getState) => {
    dispatch(beginApiCall());
    return bookApi
      .saveBook(book)
      .then(savedBook => {
        // eslint-disable-next-line no-unused-expressions
        book.id
          ? dispatch(updateBookSuccess(savedBook))
          : dispatch(createBookSuccess(savedBook));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteBook(book) {
  return dispatch => {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteBookOptimistic(book));
    return bookApi.deleteBook(book.id);
  };
}
