const Task = {
  job: ({ jobId }, args, context) => {
    return context.prisma.project({ id: jobId })
  },
}

module.exports = {
  Task,
}
