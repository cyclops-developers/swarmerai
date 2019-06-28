const Job = {
  project: ({ projectId }, args, context) => {
    return context.prisma.project({ id: projectId });
  },
  taskTotal: async ({ id }, args, context) => {
    const task = await context.prisma.tasks({ where : { jobId: id } });
    return task.length;
  },
  taskCompleted: async ({ id }, args, context) => {
    const task = await context.prisma.tasks({ where : { jobId: id } });
    return task.length;
  },
};

module.exports = {
  Job,
};
