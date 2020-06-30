import * as types from "./actionTypes";

function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}

function apiCallError() {
  return { type: types.API_CALL_ERROR };
}

export { beginApiCall, apiCallError };
