const Subscription = {
  comment: {
    subscribe(parent, { post_id }, { pubSub, db }, info) {
      const post = db.posts.find((post) => {
        return post.id === post_id && post.published;
      });

      if (!post) {
        throw new Error("Post not found!");
      }

      return pubSub.asyncIterator(`comment:${post_id}`);
    },
  },

  post: {
    subscribe(parent, args, { pubSub, db }, info) {
      return pubSub.asyncIterator("post");
    },
  },
};

export { Subscription as default };
