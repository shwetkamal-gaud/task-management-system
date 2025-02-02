import { useState, useMemo } from 'react';
import DownIcon from '../assets/DownIcon';
import { deleteMultipleTasks, FilteredTask, updateMultipleTasks, deleteTask } from '../firestore';
import DeleteIcon from '../assets/DeleteIcon';
import { EditIcon } from 'lucide-react';





const TasksList = ({ tasks, handleEdit }: { tasks: FilteredTask[], handleEdit: (item: FilteredTask) =>void }) => {
    const items = [
        {
            id: 1,
            categories: 'To Do',
            color: '#FAC3FF',

        },
        {
            id: 2,
            categories: 'In Progress',
            color: '#85D9F1',

        },
        {
            id: 3,
            categories: 'Completed',
            color: '#CEFFCC',

        },
    ];

    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [showDropup, setShowDropup] = useState(false);
    const [id, setId] = useState('')
    const toggleSelection = (id: string) => {
        setSelectedTasks((prev) =>
            prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
        );
    };

    const deselectAll = () => setSelectedTasks([]);

    const deleteSelectedTasks = async () => {
        await deleteMultipleTasks(selectedTasks)
        deselectAll();
    };

    const deleteTasks = async (id: string) => {
        await deleteTask(id)
    }



    const changeStatus = async (newStatus: string) => {
        await updateMultipleTasks(selectedTasks, newStatus)
        deselectAll();
    };

    const memoizedTasks = useMemo(() => tasks, [tasks])

    return (
        <>
            {items.map((item) => (
                <div key={item.id}>
                    <div
                        style={{
                            backgroundColor: item.color,
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                        }}
                        className={`grid grid-cols-1 mx-auto mt-10 p-4`}
                    >
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold mb-4">{item.categories}</h2>
                            <DownIcon />
                        </div>
                    </div>
                    <ul
                        style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}
                        className="bg-gray-200 flex flex-col h-50 p-2 gap-2 overflow-auto "
                    >
                        {memoizedTasks.filter((filtered) => filtered.status === item.categories).map((it) => (
                            <li
                                style={{ cursor: 'pointer' }}
                                key={it.id}
                                className="grid grid-cols-1  md:grid-cols-5 bg-white rounded-lg p-2 hover:shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.includes(it.id)}
                                        onChange={() => toggleSelection(it.id)}
                                        className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="text-gray-800">{it.title}</span>
                                </div>

                                <span className="text-sm hidden md:inline text-center self-center text-gray-500">{new Date(it.date).toISOString().split('T')[0]}</span>
                                <span className="text-sm bg-gray-200 hidden md:inline px-2 m-auto py-1 rounded-md">{it.status}</span>
                                <span
                                    className={`px-2 py-1 text-sm hidden md:inline rounded-md m-auto ${it.category === 'Work'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-100 text-blue-700'
                                        }`}
                                >
                                    {it.category}
                                </span>
                                <div className='flex flex-col relative'>
                                    <button className="text-2xl hidden md:inline text-center" onClick={() => { setId(it.id) }}>...</button>
                                    {it.id === id && (<div className={"z-10 absolute top-7 bg-pink-100 divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"}>
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li onClick={() => deleteTasks(id)}>
                                                <DeleteIcon />
                                                Delete
                                            </li>
                                            <li className='flex gap-1 px-4 text-blue-500' onClick={() => { handleEdit(it) }}>

                                                <EditIcon width={15} />
                                                Edit

                                            </li>
                                        </ul>
                                    </div>)
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            {selectedTasks.length > 0 && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white shadow-lg p-4 rounded-lg flex items-center gap-4">
                    <span className="flex items-center gap-2">
                        {selectedTasks.length} Tasks Selected
                        <button
                            onClick={deselectAll}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            ×
                        </button>
                    </span>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropup((prev) => !prev)}
                            className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Status
                        </button>
                        {showDropup && (
                            <div className="absolute bottom-12 left-0 bg-gray-800 text-white rounded-md shadow-lg p-2">
                                <button
                                    onClick={() => changeStatus('To Do')}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                >
                                    TO-DO
                                </button>
                                <button
                                    onClick={() => changeStatus('In Progress')}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                >
                                    IN-PROGRESS
                                </button>
                                <button
                                    onClick={() => changeStatus('Completed')}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                                >
                                    COMPLETED
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={deleteSelectedTasks}
                        className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            )}
        </>
    );
};

export default TasksList;
