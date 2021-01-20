const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

module.exports = {
  Query: {
    books: (parent, args, context, info) => {
      return books;
    },
  },
};
