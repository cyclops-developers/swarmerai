const { job } = require('./job');
const moment = require('moment');
const { getUserId } = require('../../utils');


const project = {
  async createProject(parent, input, context) {
    // TODO: Review way to get object properties
    let data = Object.values(input)[0];
    
    // Add user
    const userId = getUserId(context);
    const creator = { connect: { id: userId } };
    data.creator = creator;

    if (data.classes) {
      data.classes = { set: data.classes };
    }

    return context.prisma.createProject(data);
  },

  async startProject(parent, { id }, context) {
    const userId = getUserId(context);
    const projectExists = await context.prisma.projects( { where: { id } } );

    if (!projectExists) {
      throw new Error(`Project not found or you're not the creator`)
    }

    const date = moment().utc().format();

    const jobInput = {
        projectId: id,
        startDateTime: date
    };

    // Create and return the JobID
    const jobData = await job.createJob(parent, jobInput, context);

    return jobData.id;
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

    // TODO: Check if the project has active Jobs
    // if not delete the project
    return context.prisma.deleteProject({ id })
  },
}

module.exports = { project }
