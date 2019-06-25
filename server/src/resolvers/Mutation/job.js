const { getUserId } = require('../../utils');

const job = {
    async createJob(parent, input, context) {
      // Check user
      getUserId(context);

      return context.prisma.createJob(input);
    },
}

module.exports = { job }