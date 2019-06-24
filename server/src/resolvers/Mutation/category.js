const category = {

    async saveCategory(parent, input, context) {
        try {
            return context.prisma.createCategory({ name: input.category } );
        }
        catch (err) {
            console.log(err);
            return null;
        }

      },

}

module.exports = { category }