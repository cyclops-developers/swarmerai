const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { project } = require('./Mutation/project')
const { category } = require('./Mutation/category')
const { User } = require('./User')
const { Project } = require('./Project')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...project,
    ...category,
  },
  User,
  Project,
}
