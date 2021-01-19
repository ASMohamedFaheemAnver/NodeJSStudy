const Mutation = {
  emit: (parent, args, { pubSub }, info) => {
    pubSub.publish(`emit`, {
      listen: "{ msg: emit }",
    });

    return "{ msg: emit }";
  },
};

export { Mutation as default };
