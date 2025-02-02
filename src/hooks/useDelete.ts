import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMultipleTasks, deleteTask } from "../firestore";

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask, // Correct way to pass mutation function
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', { title: '', status: '', description: "", category: "", date: new Date() }],
            });
        },
    });

};

export const useDeleteMultipleTasks = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteMultipleTasks, 
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', { title: '', status: '', description: "", category: "", date: new Date() }],
            });
        },
    });
};