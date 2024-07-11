
const { z } = require('zod');


const currentDate = new Date().toISOString().split('T')[0]

const taskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    dueDate: z.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate) && date > currentDate;
    }, {
        message: "Due date must be a valid date and after the current date"
    }),

    status: z.enum(['incomplete', 'completed']).optional()
});

const updateStatusSchema = z.object({
    status: z.enum(['incomplete', 'completed'], { message: "Status must be either 'incomplete' or 'completed'" })
});

module.exports = {taskSchema,updateStatusSchema};
