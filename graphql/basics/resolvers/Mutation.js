const Mutation = {
  createUser: (parent, args, { db: { users, posts, comments } }, info) => {
    const emailTaken = users.some((user) => {
      return user.email === args.data.email;
    });

    if (emailTaken) {
      throw new Error("Email taken!");
    }

    const user = {
      id: new Date().getTime(),
      ...args.data,
    };

    users.push(user);

    return user;
  },

  updateUser: (
    parent,
    { id, data: { name, email, age } },
    { db: { users, posts, comments } },
    info
  ) => {
    const user = users.find((user) => {
      return user.id === id;
    });

    if (!user) {
      throw new Error("User not found!");
    }

    if (typeof email === "string") {
      const emailTaken = users.some((user) => {
        return user.email === email;
      });

      if (emailTaken) {
        throw new Error("Email taken!");
      }

      user.email = email;
    }

    if (typeof name === "string") {
      user.name = name;
    }

    if (typeof age !== "undefined") {
      user.age === age;
    }

    users = users.map((pUser) => {
      if (pUser.id === id) {
        return user;
      }
      return pUser;
    });

    return user;
  },

  deleteUser: (parent, args, { db: { users, posts, comments } }, info) => {
    const userIndex = users.findIndex((user) => {
      return user.id === args.id;
    });

    if (userIndex === -1) {
      throw new Error("User not found!");
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    posts = posts.filter((post) => {
      const match = post.author === deletedUser.id;
      console.log(match);
      if (match) {
        comments = comments.filter((comment) => {
          return comment.author !== deletedUser.id;
        });
      }

      return !match;
    });

    return deletedUser;
  },

  createPost: (parent, args, { db: { users, posts, comments } }, info) => {
    const userExist = users.some((user) => {
      return user.id === args.data.author;
    });

    if (!userExist) {
      throw new Error("User doesn't exist!");
    }

    const post = {
      id: new Date().getTime(),
      ...args.data,
    };

    posts.push(post);
    return post;
  },

  updatePost: (parent, { id, data: { body, title, published } }) => {
    const post = posts.find((post) => {
      return post.id === id;
    });

    if (!post) {
      throw new Error("Post doesn't exist!");
    }

    if (typeof body === "string") {
      post.body = body;
    }

    if (typeof title === "string") {
      post.title = title;
    }

    if (typeof published !== "undefined") {
      post.published = published;
    }

    posts = posts.map((pPost) => {
      if (pPost.id === id) {
        return post;
      }

      return pPost;
    });

    return post;
  },

  deletePost: (parent, args, { db: { users, posts, comments } }, info) => {
    const postExist = posts.find((post) => {
      return post.id === args.id;
    });

    if (!postExist) {
      throw new Error("Post doesn't exist!");
    }

    posts = posts.filter((post) => {
      return post.id !== args.id;
    });

    comments = comments.filter((comment) => {
      return comment.post === postExist.id;
    });

    return postExist;
  },

  createComment: (parent, args, { db: { users, posts, comments } }, info) => {
    const userExist = users.some((user) => {
      return user.id === args.data.author;
    });

    if (!userExist) {
      throw new Error("User doesn't exist!");
    }

    const postExistAndPublished = posts.some((cpost) => {
      return cpost.published && cpost.id === args.data.post;
    });

    if (!postExistAndPublished) {
      throw new Error("Post doesn't exist or published!");
    }

    const comment = {
      id: new Date().getTime(),
      ...args.data,
    };

    comments.push(comment);
    return comment;
  },

  updateComment: (
    parent,
    { id, text },
    { db: { users, posts, comments } },
    info
  ) => {
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    if (!comment) {
      throw new Error("Comment doesn't exist!");
    }

    if (typeof text === "string") {
      comment.text = text;
    }

    comments = comments.map((pComment) => {
      if (pComment.id === id) {
        return comment;
      }

      return pComment;
    });

    return comment;
  },

  deleteComment: (parent, args, { db: { users, posts, comments } }, info) => {
    const deletedComment = comments.find((comment) => {
      return comment.id === args.id;
    });

    if (!deletedComment) {
      throw new Error("Comment doesn't exist!");
    }

    comments = comments.filter((comment) => {
      return comment.id !== args.id;
    });

    return deletedComment;
  },
};

export { Mutation as default };
