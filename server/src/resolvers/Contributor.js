const Contributor = {
  user: ({ userId }, args, context) => {
    return context.prisma.user({ id:userId });
  },
};

module.exports =  {
  Contributor,
};