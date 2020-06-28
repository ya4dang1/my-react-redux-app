const books = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    slug: "harry-potter-ps",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    slug: "harry-potter-cs",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    slug: "harry-potter-pa",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 4,
    title: "Harry Potter and the Globet of Fire",
    slug: "harry-potter-gf",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 5,
    title: "Harry Potter and the Order of Phoenix",
    slug: "harry-potter-op",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 6,
    title: "Harry Potter and the Half-Blood Prince",
    slug: "harry-potter-hbp",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 7,
    title: "Harry Potter and the Deathly Hallows",
    slug: "harry-potter-dh",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 8,
    title: "A Game of Thrones",
    slug: "game-of-thrones-gt",
    authorId: 2,
    category: "American Fantasy"
  },
  {
    id: 9,
    title: "A Clash of Kings",
    slug: "game-of-thrones-ck",
    authorId: 1,
    category: "American Fantasy"
  },
  {
    id: 10,
    title: "A Storm of Swords",
    slug: "game-of-thrones-sw",
    authorId: 1,
    category: "American Fantasy"
  }
];

const authors = [
  { id: 1, name: "J. K. Rowling" },
  { id: 2, name: "George R. R. Martin" },
  { id: 3, name: "Adam Tang" }
];

const newBook = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newBook,
  books,
  authors
};
