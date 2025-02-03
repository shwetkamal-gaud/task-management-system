import { useMutation, useQueryClient } from "@tanstack/react-query";
import {   updateTask } from "../firestore";

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ taskId, updatedFields }: { taskId: string; updatedFields: { title: string, status: string, description: string, taskCategory: string, date: string } }) => {
            await updateTask(taskId, updatedFields);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', { title: '', status: '', description: "", category: "", date: new Date() }],
            });
        },
    });


};
