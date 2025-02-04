import { useEffect, useState } from 'react'

import './App.css'
import TasksList from './components/TasksList'
import TaskLogo from './assets/TaskLogo'
import ListIconSvg from './assets/ListIconSvg'
import BoardSvg from './assets/BoardSvg'
import { useAuth } from './hooks/useAuth'
import SortIcon from './assets/SortIcon'
import { getAuth, signOut } from 'firebase/auth'
import LogoutIconSvg from './assets/LogoutIconSvg'
import { useNavigate } from 'react-router'
import Dropdown from './components/Dropdown'
import { fetchFilteredTasks, FilteredTask, updateTask } from './firestore'
import Modal from './components/Modal'
import { useAddTask } from './hooks/useAdd'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { IS_EDIT, SET_DELETED, SET_UPDATED } from './redux/actions/actions'
import { useDispatch } from 'react-redux'




function App() {
  const [view, setView] = useState<"list" | "board">("list");
  const { data: user } = useAuth();
  const [tasks, setTasks] = useState<FilteredTask[]>([])
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState('')
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [taskCategory, setTaskCategory] = useState('')
  const [date, setDueDate] = useState('');
  const [status, setTaskStatus] = useState("");

  const [attachment, setAttachment] = useState<File | null>(null);
  const { mutate } = useAddTask();
  const [isEdit, setIsEdit] = useState('')
  const { is_deleted, is_updated, is_edit } = useSelector((state: RootState) => state.main)
  const dispatch = useDispatch()
  const handleEdit = async (item: FilteredTask) => {
    if (item.category || item.date || item.description || item.status || item.title) {
      setTitle(item.title)
      setDescription(item.description)
      setDueDate(item.date.toISOString().split("T")[0]);
      setTaskStatus(item.status)
      setTaskCategory(item.category)
    }
    setShow(true)
  }


  const navigate = useNavigate();
  const logOut = async () => {
    const auth = getAuth()
    try {
      await signOut(auth)
      navigate('/login')
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    setIsEdit(is_edit)
    console.log(is_edit)
  }, [is_edit])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateTask(isEdit, { title, status, description, taskCategory, date })
    }
    else if (title && date && description && taskCategory && status) {
      await mutate({ title, status, description, taskCategory, date });
    }
    dispatch({ type: IS_EDIT, payload: false })
    setShow(false)

  }
  const handleDateChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setStartDate(startDate);
    setEndDate(endDate);
  }
  useEffect(() => {
    const getTask = async () => {
      const filteredTask = await fetchFilteredTasks(
        startDate,
        endDate,
        category,
        searchQuery
      )
      setTasks(filteredTask)
    }
    dispatch({ type: SET_DELETED, payload: false })
    dispatch({ type: SET_UPDATED, payload: false })
    getTask()
  }, [startDate, endDate, category, searchQuery, fetchFilteredTasks, show, is_deleted, is_updated])

  return (
    <div className="w-full h-full mx-auto p-4" >
      <div className='flex justify-between'>
        <div className="flex flex-col items-start justify-between mb-4">
          <div className='flex'>
            <TaskLogo color='#000' /><h1 className="text-2xl font-bold text-gray-800">TaskBuddy</h1>
          </div>
          <div className="flex gap-2">
            <button
              className={`flex items-center px-4 py-2 rounded-md ${view === "list" ? "text-black " : "text-gray-500"
                }`}
              onClick={() => setView("list")}
            >
              <ListIconSvg /> List
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${view === "board" ? "text-black" : "text-gray-500"
                }`}
              onClick={() => setView("board")}
            >
              <BoardSvg /> Board
            </button>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex gap-1 items-center'>
            <img width={30} height={30} style={{ borderRadius: '50%' }} src={user?.photoURL ?? ''} alt={user?.displayName ?? 'user'} />
            <span className='text-gray-400'>{user?.displayName ?? ''}</span>
          </div>
          <button onClick={logOut} className='m-auto flex text-sm items-center gap-1 bg-pink-100 rounded-lg px-3 py-2'>
            <LogoutIconSvg />
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center jusitfy-between w-full gap-4 mb-6">
        <div className='flex flex-col md:flex-row gap-2'>
          <span>filter by:</span>
          <Dropdown btnBolor='white' selected={category} setSelected={setCategory} isIcon direction='dropdown' items={['Work', 'Personal']} />
          <Dropdown isDate btnBolor='white' direction='dropdown' handleDateChange={(ranges) => handleDateChange(ranges)} startDate={startDate} endDate={endDate} />
        </div>
        <div className='flex flex-col md:flex-row justify-end gap-2'>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" id="default-search" className="block w-full px-5 py-2 ps-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " style={{ borderRadius: '30px' }} />
          </div>
          <button onClick={() => setShow(true)} className="px-5 py-2 bg-[#7B1984] text-white " style={{ borderRadius: '20px' }}>
            Add Task
          </button>
        </div>

      </div>

      <div className={'flex p-1 flex-col '} >
        {view === 'list' && <div className='hidden md:grid grid-cols-5 md:border-t-2 md:border-t-gray-300 pt-2  items-center text-center '>
          <span>
            Task Name
          </span>
          <span className='flex items-center justify-center gap-1'>
            Due on <SortIcon />
          </span>
          <span>
            Task Status
          </span>
          <span>
            Task Category
          </span>
        </div>}
        {view === "list" ? (
          <div className='h-full'>
            <TasksList view={view} handleEdit={handleEdit} tasks={tasks} />
          </div>
        ) : (
          <div className='h-full'>
            <TasksList view={view} handleEdit={handleEdit} tasks={tasks} />
          </div>
        )}
      </div>
      <Modal isOpen={show} onClose={() => setShow(false)} header={isEdit ? 'Edit Task' : 'Create Task'}>
        <div>
          <input
            type="text"
            placeholder="Task title"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={300}
          ></textarea>
          <div className='grid grid-cols-3 gap-2'>
            <div className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Task Category*</span>
              <div className="flex items-center gap-4 mb-4">
                <button
                  className={`py-2 px-4 rounded-lg ${taskCategory === "Work" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  onClick={() => setTaskCategory("Work")}
                >
                  Work
                </button>
                <button
                  className={`py-2 px-4 rounded-lg ${taskCategory === "Personal"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                    }`}
                  onClick={() => setTaskCategory("Personal")}
                >
                  Personal
                </button>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Due on*</span>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                value={date}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Task Status*</span>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                value={status}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="">Choose Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-4 text-center">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAttachment(e.target.files[0]);
                }
              }}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer text-blue-500">
              {attachment ? attachment?.name : "Drop your files here or Update"}
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="py-2 px-4 rounded-lg bg-gray-200"
            onClick={() => (setShow(false))}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 rounded-lg bg-purple-500 text-white"
            onClick={handleSubmit}
          >
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </Modal>
    </div>
  )
};




export default App
