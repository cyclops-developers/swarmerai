const Project = {
  creator: ({ id }, args, context) => {
    return context.prisma.project({ id }).creator()
  },
}

module.exports = {
  Project,
}
