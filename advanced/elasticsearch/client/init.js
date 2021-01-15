const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

(async () => {
  const result = await client.cluster.health({});
  // console.log(result);

  const result2 = await client.search({
    body: {
      query: {
        match_all: {},
      },
    },
  });

  console.log(result2);
})();
