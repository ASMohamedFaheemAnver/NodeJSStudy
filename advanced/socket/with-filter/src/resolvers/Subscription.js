import { withFilter } from "graphql-yoga";

const Subscription = {
  listen: {
    async subscribe(parent, args, context, info) {
      console.log({ emitted: "listen.subscribe" });
      return withFilter(
        () => {
          return withCancel(context.pubSub.asyncIterator(`emit`), () => {
            console.log({ emitted: "listen.unSubscribe" });
          });
        },
        (payload, { id }) => {
          if (id != 1) return true;
          return false;
        }
      )(parent, args, context, info);
    },
    resolve: (payload, args, context, info) => {
      return payload.listen;
    },
  },
};

const withCancel = (asyncIterator, onCancel) => {
  const asyncReturn = asyncIterator.return;

  asyncIterator.return = () => {
    onCancel();
    return asyncReturn
      ? asyncReturn.call(asyncIterator)
      : Promise.resolve({ value: undefined, done: true });
  };

  return asyncIterator;
};

export { Subscription as default };
