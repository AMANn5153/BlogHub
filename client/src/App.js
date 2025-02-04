import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import {UploadImage, CreatePassword} from './pages/Signup/Signup';
import {SignupProvider} from './pages/Signup/signupContext/SignupContext';
import {AuthProvider} from './context/authContext/useAuthContext';
import { ToastContainer } from 'react-toastify';
import CreateBlog from './pages/createBlog/CreateBlog';
import PrivateRoute from './privateRoute/privateRoute';
import Blogs from './pages/Blogs/Blogs.jsx';
import {EditorContextProvider} from './components/textEditor/EditorContext/EditorContext.js';
import {SocketProvider} from './context/socket/useSocket';
import CommentThread from './pages/Comment/CommentThread';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import ForgetPassword from './pages/Login/ForgetPassword.jsx';
import ChangePassword from './pages/Login/ChangePassword.jsx';

function App() {
  return (
    <>
    <AuthProvider>
    <SocketProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgetPassword' element={<ForgetPassword/>}></Route>
      <Route path='/changePassword/:token' element={<ChangePassword/>}></Route>
      <Route path='/signup' element={<><SignupProvider><Signup/></SignupProvider></>}></Route>
      <Route path='/upload' element={<><SignupProvider><UploadImage/></SignupProvider></>}></Route>
      <Route path='/createpassword' element={<><SignupProvider><CreatePassword/></SignupProvider></>}></Route>
      <Route path='/createBlog' element={
      <EditorContextProvider purpose="blog">
        <PrivateRoute>
          <CreateBlog/>
        </PrivateRoute>
      </EditorContextProvider>
      }> 
      </Route>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="/blog/:id" element={<Blogs/>}></Route>
        <Route path="/comment/:id" element={<CommentThread/>}></Route>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
      </Route>
    </Routes>
  </BrowserRouter> 
  <ToastContainer 
  />
  </SocketProvider>
  </AuthProvider>
  </>
  )
}

export default App;
