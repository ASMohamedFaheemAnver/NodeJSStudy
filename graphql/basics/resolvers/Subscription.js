const Subscription = {
  count: {
    subscribe(parent, args, { pubSub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubSub.publish("count", { count: count });
      }, 1000);
      return pubSub.asyncIterator("count");
    },
  },

  comment: {
    subscribe(parent, { post_id}, { pubSub, db }, info) {
      const post = db.posts.find(post => {
        return post.id === post_id && post.published;
      })


      if (!post) {
        throw new Error("Post not found!");
      }

      return pubSub.asyncIterator(`comment:${post_id}`)
    }
  }
};

export { Subscription as default };
