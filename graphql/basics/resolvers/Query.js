const Query = {
  me: () => {
    return {
      id: "123098",
      name: "Freedom",
      email: "jstrfaheem065@gmail.com",
      age: 20,
    };
  },

  post: () => {
    return {
      id: "12",
      title: "GrqphQL tutorial",
      body: "This is a body telling about post",
      published: false,
    };
  },

  greeting: (parent, args, { db: { users, posts, comments } }, info) => {
    return `Hello my friend ${args.name}`;
  },

  add: (parent, { numbers }, { db: { users, posts, comments } }, info) => {
    return numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  },
  grades: (parent, args, { db: { users, posts, comments } }, info) => {
    return [99, 80, 93];
  },
  users: (parent, args, { db: { users, posts, comments } }, info) => {
    return users;
  },
  posts: (parent, args, { db: { users, posts, comments } }, info) => {
    return posts;
  },
  comments: (parent, args, { db: { users, posts, comments } }, info) => {
    return comments;
  },
};

export { Query as default };
