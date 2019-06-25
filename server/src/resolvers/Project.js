const Project = {
  creator: ({ id }, args, context) => {
    return context.prisma.project({ id }).creator()
  },
  currentJob: async ({ id }, args, context) => {
    const project = await context.prisma.project({ id });
    if (project) {
      const current = await context.prisma.jobs({
        where: { projectId:id },
        orderBy: 'startDateTime_DESC',
      });
      if (current) {
        return current[0];
      }
    }
    return null;
  },
}

module.exports = {
  Project,
}
