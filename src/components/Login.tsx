import TaskLogo from '../assets/TaskLogo'
import GoogleSvg from '../assets/GoogleSvg'
import CirclesBgSvg from '../assets/CirclesBgSvg'
import TaskListViewSvg from '../assets/TaskListViewSvg'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchUser } from '../redux/actions/authActions'
import { auth } from '../firebase'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(fetchUser(result.user));
      if (result) navigate('/');
    } catch (error) {
      console.error("Login Error:", error);
    }
  }
  return (
    <div className="flex  gap-4 bg-[#FFF9F9]">
      <div className="w-full md:w-5/12 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col  justify-center gap-1">
          <div className="flex items-center ">
            <TaskLogo color='#7B1984' />
            <h4 style={{ fontSize: '1.7rem' }} className="text-[#7B1984]">
              TaskBuddy
            </h4>
          </div>
          <span className="text-gray-800 ">
            Streamline your workflow and track progress effortlessly <br />
            with our all-in-one task management app.
          </span>
        </div>
        <button onClick={handleLogin}
          style={{ fontWeight: 500, fontSize: '1.3rem' }}
          className="w-100  text-white flex items-center justify-center gap-1 p-3 rounded bg-gray-800"
        >
          <GoogleSvg /> <span>Continue with Google</span>
        </button>
      </div>
      <div className="w-full md:w-7/12 relative flex items-center justify-end">
        <CirclesBgSvg />
        <div className="absolute top-15">
          <TaskListViewSvg />
        </div>
      </div>
    </div>
  )
}

export default Login