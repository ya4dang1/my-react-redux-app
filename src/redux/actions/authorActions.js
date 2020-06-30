import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

// every thunk returns a function that accepts dispatch as an argument
export function loadAuthors() {
  // redux thunk injects dispatch so we don't have to
  return dispatch => {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(apiCallError(apiCallError));
        throw error;
      });
  };
}
