"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Project",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "ProjectType",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://127.0.0.1:4466`
});
exports.prisma = new exports.Prisma();
