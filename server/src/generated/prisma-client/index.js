"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Project",
    embedded: false
  },
  {
    name: "Category",
    embedded: false
  },
  {
    name: "Job",
    embedded: false
  },
  {
    name: "Task",
    embedded: false
  },
  {
    name: "ProjectType",
    embedded: false
  },
  {
    name: "ProjectStatus",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://127.0.0.1:4466`
});
exports.prisma = new exports.Prisma();
