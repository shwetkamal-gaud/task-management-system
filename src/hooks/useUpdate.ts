import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FilteredTask, updateMultipleTasks, updateTask } from "../firestore";

export const useUpdateTaskStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ taskId, updatedFields }: { taskId: string; updatedFields: Partial<FilteredTask> }) => {
            await updateTask(taskId, updatedFields);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', { title: '', status: '', description: "", category: "", date: new Date() }],
            });
        },
    });


};

export const useUpdateMultipleTaskStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ taskIds, newStatus }: { taskIds: string[]; newStatus: string }) => {
            await updateMultipleTasks(taskIds, newStatus);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', { title: '', status: '', description: "", category: "", date: new Date() }],
            });
        },
    });
};