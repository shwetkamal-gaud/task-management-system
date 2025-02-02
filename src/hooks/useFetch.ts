import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchFilteredTasks, FilteredTask } from "../firestore";

interface TaskFilters {
    startDate: Date | undefined;
    endDate: Date | undefined;
    category: string;
    searchQuery: string;
}

export const useTasks = (filters: TaskFilters): UseQueryResult<FilteredTask[] | Error> => {
    return useQuery({
        queryKey: ["tasks", filters], 
        queryFn: () => fetchFilteredTasks(filters.startDate, filters.endDate, filters.category, filters.searchQuery), 
        staleTime: 5 * 60 * 1000, 
    });
};