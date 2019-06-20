const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { project } = require('./Mutation/project')
const { User } = require('./User')
const { Project } = require('./Project')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...project,
  },
  User,
  Project,
}
