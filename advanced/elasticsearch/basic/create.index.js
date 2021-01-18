const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

(async () => {
  const result = await client.indices.create({
    index: "playground",
    body: {
      settings: {
        number_of_shards: 1,
        number_of_replicas: 0,
      },
    },
  });

  // await client.indices.delete({
  //   index: "playground",
  // });

  console.log(result);
})();
