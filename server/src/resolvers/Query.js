import { getNextTask } from '../task';
import { getUserId } from '../utils';
import { getContributors } from '../utils/contributorUtils';

const Query = {
  projects(parent, args, context) {
    const id = getUserId(context);
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

  getJobs: async (parent, { projectId }, context) => {
    // Check user
    getUserId(context);

    // Get Project Id
    const where = {
      projectId,
    };
    return context.prisma.jobs({ where });
  },

  getActiveJobs(parent, args, context) {
    return context.prisma.jobs({ where: { status: 'ACTIVE' } });
  },

  getNextTask(parent, { jobId }, context) {
    return getNextTask(jobId);
  },

  getTopContributors: async (parent, { projectId, jobId, quantity }, context) => {
    // Get jobs based in the project id
    const where = {
      projectId,
    };
    // Check job ib
    if (jobId) {
      where.id = jobId;
    }

    const jobs = await context.prisma.jobs({ where });

    // if no jobs for that id
    if (!jobs || jobs.length === 0) {
      return null;
    }
    
    // Get Contributors
    const returnContributors = await getContributors(context, jobs);
    return returnContributors.slice(0,quantity);
  },
};

module.exports = { Query };
