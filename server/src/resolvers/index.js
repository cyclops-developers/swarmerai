const { Query } = require('./Query');
const { auth } = require('./Mutation/auth');
const { project } = require('./Mutation/project');
const { category } = require('./Mutation/category');
const { task } = require('./Mutation/task');
const { User } = require('./User');
const { Project } = require('./Project');
const { job } = require('./Mutation/job');
const { Job } = require('./Job');
const { Task } = require('./Task');

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...project,
    ...category,
    ...task,
    ...job,
  },
  User,
  Project,
  Job,
  Task,
};
