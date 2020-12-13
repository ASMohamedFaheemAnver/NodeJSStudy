import Member from "../model/member";

const Mutation = {
  createMember: async (parent, { memberInput: { name, age } }, ctx, info) => {

    const isMemberExist = await Member.exists(memberInput);

    if (isMemberExist) {
      const error = new Error("member already exist!");
      error.code = 403;
      throw error;
    }

    const member = new Member({
      name,
      age
    });
    await member.save();

    return member;
  },

};

export { Mutation as default };
