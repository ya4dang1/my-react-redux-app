import * as types from "./actionTypes";

export function createBook(book) {
  return { type: types.CREATE_BOOK, book };
}

export function editBook(book) {
  return { type: types.EDIT_BOOK, book };
}
