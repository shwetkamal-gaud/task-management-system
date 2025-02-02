import { useQuery } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";


const fetchCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => resolve(user));
    });
};


export const useAuth = () => {
    return useQuery<User | null>({
        queryKey: ['currentUser', 'tasks'],
        queryFn: fetchCurrentUser, 
        staleTime: 1000 * 60,
    });
};
