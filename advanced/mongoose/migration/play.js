const adminSchema = require("./schema/admin");
const getConnections = require("./connection");

const AdminSchemaName = "Admin";

(async () => {
  const connections = await getConnections();
  const AdminModels = connections.map((con) => {
    return con.model(AdminSchemaName, adminSchema);
  });

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const cursor = AdminModels[0].find({}).cursor();
  let localIndex = 0;
  let cloudIndex = 0;
  while (true) {
    const res = await cursor.next();
    localIndex++;
    if (localIndex > cloudIndex + 500) {
      console.log({ msg: "Artificial Delay!", localIndex, cloudIndex });
      await timer(10000);
    }
    if (!res) {
      console.log({ msg: "Done!" });
      break;
    }
    const result = new AdminModels[1](res._doc);
    result
      .save()
      .then((_) => {
        console.log({ currentMigratedIndex: cloudIndex++ });
      })
      .catch((err) => {
        console.log({ exceptionOccuredIndex: cloudIndex, err });
        process.exit(0);
      });
  }
})();
