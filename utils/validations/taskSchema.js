// validation/taskSchema.js
const { z } = require('zod');

// Get the current date in UTC format to compare with due date
const currentDate = new Date();

const taskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    dueDate: z.date().refine((date) => date > currentDate, {
        message: "Due date must be after the current date"
    }),
    status: z.enum(['incomplete', 'completed']).optional()
});
const updateStatusSchema = z.object({
    status: z.enum(['incomplete', 'completed'], { message: "Status must be either 'incomplete' or 'completed'" })
});

module.exports = {taskSchema,updateStatusSchema};
