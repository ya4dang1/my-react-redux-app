import * as types from "./actionTypes";
import * as bookApi from "../../api/bookApi";

export function createBook(book) {
  return { type: types.CREATE_BOOK, book };
}

export function loadBooksSuccess(books) {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}

// every thunk returns a function that accepts dispatch as an argument
export function loadBooks(book) {
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
