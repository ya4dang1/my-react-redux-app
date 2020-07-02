/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { mount } from "enzyme";
import { authors, newBook, books } from "../../../tools/mockData";
import { ManageBookPage } from "./ManageBookPage";

function render(args) {
  const defaultProps = {
    book: newBook,
    books,
    authors,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.Enzyme.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    loadBooks: jest.fn(),
    loadAuthors: jest.fn(),
    saveBook: jest.fn(),
    history: {},
    match: {}
  };

  const props = { ...defaultProps, ...args };

  // For these tests, we need to use mount so the child component is rendered too.
  // Enzyme uses a library called JS DOM behind the scene to create this
  // in-memory DOM
  return mount(<ManageBookPage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
