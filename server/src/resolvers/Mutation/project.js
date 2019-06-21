const { getUserId } = require('../../utils')

const project = {
  async createProject(parent, input, context) {
    // const userId = getUserId(context)

    // TODO: Review way to get object properties
    const data = Object.values(input)[0];

    return context.prisma.createProject(data);
  },

  async startProject(parent, { id }, context) {
    const userId = getUserId(context)
    const projectExists = await context.prisma.$exists.project({
      id,
      creator: { id: userId },
    })
    if (!projectExists) {
      throw new Error(`Project not found or you're not the creator`)
    }

    // Create and return the JobID
    return 0
  },

  async deleteProject(parent, { id }, context) {
    const userId = getUserId(context)
    const projectExists = await context.prisma.$exists.project({
      id,
      creator: { id: userId },
    })
    if (!projectExists) {
      throw new Error(`Project not found or you're not the creator`)
    }

    return context.prisma.deleteProject({ id })
  },
}

module.exports = { project }
