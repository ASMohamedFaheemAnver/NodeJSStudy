import Member from "../model/member";

const Mutation = {
  createMember: async (parent, { memberInput: { name, age } }, ctx, info) => {
    const isMemberExist = await Member.findOne({ name: name, age: age });

    if (isMemberExist) {
      const error = new Error("member already exist!");
      error.code = 403;
      throw error;
    }

    const member = new Member({
      name,
      age,
    });
    await member.save();

    return member;
  },

  useTransaction: async (parent, { memberId }, ctx, info) => {
    const session = await Member.startSession();
    session.startTransaction();
    try {
      const updatedMember = await Member.updateOne(
        { _id: memberId },
        { $inc: { age: 1 } },
        { session: session }
      );
      // other schema within transactions if we need

      // forcing error
      throw new Error("Just for fun dooooooooood!");
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      session.endSession();
    }
    return { message: "200 OK!" };
  },
};

export { Mutation as default };
