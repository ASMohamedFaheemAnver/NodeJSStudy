const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

(async () => {
  const result = await client.search({
    index: "playground",
    type: "products",
    body: {
      query: {
        match_all: {},
      },
    },
  });

  console.log(result.body.hits);
})();
