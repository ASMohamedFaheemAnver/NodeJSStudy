const resolver1 = require("./resolvers/resolver1");
const resolver2 = require("./resolvers/resolver2");
const resolver3 = require("./resolvers/resolver3");
const resolver4 = require("./resolvers/resolver4");

module.exports = {
  ...resolver1,
  ...resolver2,
  ...resolver3,
  ...resolver4,
};
