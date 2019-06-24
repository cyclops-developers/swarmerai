const { getUserId } = require('../../utils');

const task = {

    async submitTask(parent, input, context) {
        // TODO: Review way to get object properties
        let data = Object.values(input)[0];

        // Add user
        const userId = getUserId(context);
        data.userId = userId;

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