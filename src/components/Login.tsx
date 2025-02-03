import TaskLogo from '../assets/TaskLogo'
import GoogleSvg from '../assets/GoogleSvg'
import CirclesBgSvg from '../assets/CirclesBgSvg'
import TaskListViewSvg from '../assets/TaskListViewSvg'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router'

import { auth } from '../firebase'
import MobileBg from '../assets/MobileBg'

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result) navigate('/');
    } catch (error) {
      console.error("Login Error:", error);
    }
  }

  return (
    <div className="lg:flex lg:gap-4 bg-[#FFF9F9] h-screen">
      <div className="w-full lg:w-5/12 relative h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 lg:hidden z-0 h-full overflow-hidden w-full">
          <MobileBg />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center">
              <TaskLogo color='#7B1984' />
              <h4 className="text-[#7B1984] text-2xl font-bold">TaskBuddy</h4>
            </div>
            <span className="text-gray-800">
              Streamline your workflow and track progress effortlessly <br />
              with our all-in-one task management app.
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="w-full max-w-xs text-white text-lg flex items-center justify-center gap-2 p-3 rounded bg-gray-800"
          >
            <GoogleSvg /> <span>Continue with Google</span>
          </button>
        </div>
      </div>

      <div className="hidden lg:flex xl:w-7/12 overflow-hidden h-full   lg:w-8/13 relative items-center justify-end">
        <CirclesBgSvg />
        <div className="absolute xl:top-15">
          <TaskListViewSvg />
        </div>
      </div>
    </div>
  );
}


export default Login