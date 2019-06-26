const Job = {
  project: ({ projectId }, args, context) => {
    return context.prisma.project({ id: projectId })
  },
}

module.exports = {
  Job,
}
