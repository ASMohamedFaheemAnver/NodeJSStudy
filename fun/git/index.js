const request = require("request");
const config = require("config");
const fs = require("fs");
const fetch = require("cross-fetch");

getRepos();

async function getRepos() {
  try {
    const options = {
      uri: `https://api.github.com/users/${config.get(
        "userName"
      )}/repos?sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      const json = JSON.parse(body);
      fs.writeFile("repos.json", JSON.stringify(json), () => {});
      let total = 0;
      json.forEach((repo) => {
        getSloc(repo.full_name).then((lines) => {
          total += lines;
          console.log({ lines: lines, accumulation: total });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

function getSloc(repo) {
  if (!repo) {
    return Promise.reject(new Error("repository not provided"));
  }

  let url = "https://api.github.com/repos/" + repo + "/stats/code_frequency";

  return fetch(url)
    .then((x) => x.json())
    .then((x) => {
      return x.reduce((total, changes) => total + changes[1] + changes[2], 0);
    })
    .catch((err) => console.log(err));
}
