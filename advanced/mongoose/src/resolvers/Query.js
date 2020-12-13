import Member from "../model/member";

const Query = {
  initProject: async (parent, args, ctx, info) => {
    const members = await Member.aggregate([{ $project: { name: 1, age: 1 } }]);
    return members;
  },
  ageGreaterThan: async (parent, { age }, ctx, info) => {
    const members = await Member.aggregate([{ $match: { age: { $gte: age } } }]);
    return members;
  }
};

export { Query as default };
