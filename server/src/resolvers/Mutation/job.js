const { getUserId } = require('../../utils');

const job = {
    async createJob(parent, input, context) {
      // Check user
      getUserId(context);

      // TODO: Add queue creation here

      return context.prisma.createJob(input);
    },
}

module.exports = { job }