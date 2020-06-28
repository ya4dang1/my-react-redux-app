const books = [
  {
    id: 1,
    title: "Harry Porter and the Philosopher's Stone",
    slug: "harry-porter-ps",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 2,
    title: "Harry Porter and the Chamber of Secrets",
    slug: "harry-porter-cs",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 3,
    title: "Harry Porter and the Prisoner of Azkaban",
    slug: "reharry-porter-pa",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 4,
    title: "Harry Porter and the ",
    slug: "javascript-development-environment",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 5,
    title: "Harry Porter and the Globet of Fire",
    slug: "harry-porter-gf",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 6,
    title: "Harry Porter and the Order of Phoenix",
    slug: "harry-porter-op",
    authorId: 1,
    category: "British Fantasy"
  },
  {
    id: 7,
    title: "Harry Porter and the Half-Blood Prince",
    slug: "harry-porter-hbp",
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
