const Job = {
  project: ({ projectId }, args, context) => {
    return context.prisma.project({ id: projectId });
  },
  async taskTotal({ id }, args, context) {
    const task = await context.prisma.tasks({ where : { jobId: id } });
    return task.length;
  },
  async taskCompleted({ id }, args, context) {
    const task = await context.prisma.tasks({ where : { jobId: id } });
    return task.length;
  },
};

module.exports = {
  Job,
};
