import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import * as bookActions from "./bookActions";
import * as types from "./actionTypes";
import { books } from "../../../tools/mockData";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  /**
   * For every test that we put inside here, afterEach() will run
   */
  afterEach(() => {
    /**
     * To keep our test atomic, it's important to run fetchMock.restore().
     * It initialize fetchMock for each test.
     */
    fetchMock.restore();
  });

  describe("Load Books Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_BOOKS_SUCCESS when loading books", () => {
      /**
       * This captures all fetch calls and responds with some mock data.
       * So this mimics the response that our API would return, but avoids making an actual API call
       */
      fetchMock.mock("*", {
        body: books,
        headers: { "content-type": "application/json" }
      });

      /**
       * Goal: Assert these actions are created.
       * These actions are expected to be fired from the thunk
       */
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_BOOKS_SUCCESS, books }
      ];

      /**
       * Create a mock redux store
       * Initialize the store to contain empty array of books
       */
      const store = mockStore({ books: [] });
      // Dispatch the loadBooks action, which returns a promise
      return store.dispatch(bookActions.loadBooks()).then(() => {
        // Call getActions on the mockStore, which returns a list of actions that have occured.
        // Assert that the list of actions matches the expected actions we declared above
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createBookSuccess", () => {
  it("should create a CREATE_BOOK_SUCCESS action", () => {
    // arrage
    const book = books[0];
    const expectedAction = {
      type: types.CREATE_BOOK_SUCCESS,
      book
    };

    // act
    const action = bookActions.createBookSuccess(book);

    // assert
    expect(action).toEqual(expectedAction);
  });
});
