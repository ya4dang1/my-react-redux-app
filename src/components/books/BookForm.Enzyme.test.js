import React from "react";
import { shallow } from "enzyme";
import BookForm from "./BookForm";

function renderBookForm(args) {
  const defaultProps = {
    authors: [],
    book: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return shallow(<BookForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderBookForm();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Book");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderBookForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save buttons as "Saving..." when saving', () => {
  const wrapper = renderBookForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
