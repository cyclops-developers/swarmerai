const Project = {
  creator: ({ id }, args, context) => {
    return context.prisma.project({ id }).creator()
  },
  currentJob: ({ id }, args, context) => {
    const project = context.prisma.project({ id });
    if (project && project.currentJob) {
      return context.prisma.job({ id });
    }
    return null;
  },
}

module.exports = {
  Project,
}
