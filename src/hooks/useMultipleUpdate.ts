import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMultipleTasks } from "../firestore";

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