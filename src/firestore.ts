import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { collection, getDocs, query, where, addDoc, Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";

export interface FilteredTask {
    id: string;
    title: string;
    category: string;
    date: Date;
    description: string;
    status: string;
}

export const fetchFilteredTasks = async (
    startDate: Date | undefined,
    endDate: Date | undefined,
    category: string,
    searchQuery: string
): Promise<FilteredTask[]> => {
    try {
        let taskQuery = (collection(db, "tasks"));
        let q;
        if (startDate && endDate) {
            console.log(Timestamp.fromDate(new Date(startDate))), Timestamp.fromDate(new Date(endDate))
            q = query(taskQuery, where("date", ">=", Timestamp.fromDate(new Date(startDate))), where("date", "<=", Timestamp.fromDate(new Date(endDate))));
        }

        if (category) {
            q = query(taskQuery, where("category", "==", category));
        }

        const querySnapshot = await getDocs(q ?? taskQuery);
        let tasks: FilteredTask[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tasks.push({
                id: doc.id,
                title: data.title,
                category: data.category,
                date: data.date,
                description: data.description,
                status: data.status
            });
        });

        if (searchQuery) {
            tasks = tasks.filter((task) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        console.log("sdbaksbl", tasks.map((items) => items.date))
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

export const addTask = async (title: string, status: string, description: string, taskCategory: string, date: string) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) throw new Error("User not authenticated");
        const docRef = await addDoc(collection(db, "tasks"), {
            title,
            description: description,
            category: taskCategory,
            status,
            date: Timestamp.fromDate(new Date(date)),
            userId: user.uid,
            createdAt: Timestamp.now(),
        });

        console.log("Task added with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

export const deleteTask = async (taskId: string) => {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
        console.log(`Task ${taskId} deleted successfully`);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}
export const deleteMultipleTasks = async (taskIds: string[]) => {
    try {
        const deletePromises = taskIds.map((id) => deleteDoc(doc(db, "tasks", id)));
        await Promise.all(deletePromises);
        console.log("Selected tasks deleted successfully");
    } catch (error) {
        console.error("Error deleting multiple tasks:", error);
    }
}

export const updateTask = async (taskId: string, updatedFields: { title: string, status: string, description: string, taskCategory: string, date: string }) => {
    try {
        await updateDoc(doc(db, "tasks", taskId), { ...updatedFields, date: Timestamp.fromDate(new Date(updatedFields.date)) });
        console.log(`Task ${taskId} updated successfully`);
    } catch (error) {
        console.error("Error updating task:", error);
    }
};
export const updateMultipleTasks = async (
    taskIds: string[],
    newStatus: string
) => {
    try {
        const updatePromises = taskIds.map((id) => updateDoc(doc(db, "tasks", id), { status: newStatus }));
        await Promise.all(updatePromises);
        console.log("Selected tasks updated successfully");
    } catch (error) {
        console.error("Error updating multiple tasks:", error);
    }
}