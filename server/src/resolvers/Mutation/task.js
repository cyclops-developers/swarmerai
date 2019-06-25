import { submitTask } from '../../task'
const { getUserId } = require('../../utils')

const task = {
  async submitTask(parent, args, context) {
    // Add user
    const userId = getUserId(context)
    try {
      return submitTask({ ...args.input, userId })
    } catch (err) {
      console.log(err)
      return null
    }
  },
}

module.exports = { task }
