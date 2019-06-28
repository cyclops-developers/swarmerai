import { endJob } from '../../job';
const { getUserId } = require('../../utils');

const job = {
  async endJob(parent, { id }, context) {
    // TODO auth check
    const job = await endJob(id);
    return job;
  },
};

module.exports = { job };
