import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const BookForm = ({
  book,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{book.id ? "Edit Book" : "Add Book"}</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={book.title}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput
        name="authorId"
        label="Author"
        value={book.authorId || ""}
        defaultOption="Select Author"
        options={authors.map(author => ({
          value: author.id,
          text: author.name
        }))}
        onChange={onChange}
        error={errors.author}
      />

      <TextInput
        name="category"
        label="Category"
        value={book.category}
        onChange={onChange}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

BookForm.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  book: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  errors: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

BookForm.defaultProps = {
  errors: {},
  saving: null
};

export default BookForm;
