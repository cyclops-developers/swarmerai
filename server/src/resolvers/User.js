const User = {
  projects: ({ id }, args, context) => {
    return context.prisma.user({ id }).projects()
  },
}

module.exports = {
  User,
}