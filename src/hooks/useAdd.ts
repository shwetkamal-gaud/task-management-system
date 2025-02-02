import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../firestore";

export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { title: string, status: string, description: string, taskCategory: string, date: string }>({
        mutationFn: async ({ title, status, description, taskCategory, date }) => {

            await addTask(title, status, description, taskCategory, date);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', { title: '', status: '', description: "", taskCategory: "", date: '' }],
            });
        },
    });
};
