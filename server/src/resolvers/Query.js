const { getUserId } = require('../utils')

const Query = {
  projects(parent, args, context) {
    const id = getUserId(context)
    const where = {
      creator: {
        id,
      },
    }
    return context.prisma.projects({ where })
  },
  project(parent, { id }, context) {
    return context.prisma.project({ id })
  },
  me(parent, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
}

module.exports = { Query }
