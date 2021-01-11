const fetch = require("cross-fetch");

(async () => {
  let res;
  // root fetch
  const root = await fetch("http://localhost:9200/");
  res = await root.json();
  // console.log(res);

  // status of nodes
  const nodes = await fetch("http://localhost:9200/_cat/nodes?v");
  res = await nodes.text();
  // console.log(res);

  // cluster health
  const health = await fetch("http://localhost:9200/_cluster/health");
  res = await health.json();
  // console.log(res);

  // sending query
  const search = await fetch(
    'http://localhost:9200/.kibana/_search/?source_content_type=application/json&source={"query":{"match_all":{}}}'
  );
  res = await search.json();
  console.log(res);
})();
