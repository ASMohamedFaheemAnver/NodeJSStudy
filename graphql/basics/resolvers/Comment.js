const Comment = {
  author(parent, args, { db: { users, posts, comments } }, info) {
    return users.find((user) => {
      return user.id === parent.author;
    });
  },
  post(parent, args, { db: { users, posts, comments } }, info) {
    return posts.find((post) => {
      return post.id === parent.post;
    });
  },
};

export { Comment as default };
