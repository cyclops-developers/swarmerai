const Task = {
  job: ({ jobId }, args, context) => {
    return context.prisma.job({ id: jobId })
  },
}

module.exports = {
  Task,
}
