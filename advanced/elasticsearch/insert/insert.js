const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

(async () => {
  const result = await client.index({
    index: "playground",
    type: "products",
    body: {
      name: "Coffee maker",
      price: 64,
      in_stock: 10,
    },
  });

  console.log(result);
})();
