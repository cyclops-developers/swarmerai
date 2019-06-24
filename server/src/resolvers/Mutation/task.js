const task = {

    async submitTask(parent, input, context) {
        // TODO: Review way to get object properties
        let data = Object.values(input)[0];
    
        try {
            return context.prisma.createTask(data);
        }
        catch (err) {
            console.log(err);
            return null;
        }

      },

}

module.exports = { task }