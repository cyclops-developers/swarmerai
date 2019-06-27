import { getNextTask } from '../task'
const { getUserId } = require('../utils')

const Query = {
  projects(parent, args, context) {
    const id = getUserId(context)
    const where = {
      creator: {
        id,
      },
    };
    return context.prisma.projects({ where });
  },
  project(parent, { id }, context) {
    return context.prisma.project({ id });
  },
  me(parent, args, context) {
    const id = getUserId(context);
    return context.prisma.user({ id });
  },
  getCategories(parent, args, context) {
    return context.prisma.categories();
  },
  async getJobs(parent, { id }, context) {
    // Check user
    getUserId(context);

    console.log(id);

    // Get Project Id
    const where = {
      projectId: id,
    };
    return context.prisma.jobs({ where });
  },
  getActiveJobs(parent, args, context) {
    // TODO: Query only active jobs
    return context.prisma.jobs();
  },
  getNextTask(parent, { jobId }, context) {
    return getNextTask(jobId);
  },
}

module.exports = { Query }
