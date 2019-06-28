const Job = {
  project: ({ projectId }, args, context) => {
    return context.prisma.project({ id: projectId });
  },
  taskCompleted: async ({ id }, args, context) => {
    const task = await context.prisma.tasks({ where : { jobId: id } });

    // TODO: Add a count to validate the number of validations for that task

    return task.length;
  },
};

module.exports = {
  Job,
};
