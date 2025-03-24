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
import PrivateRoute from './privateRoute/privateRoute';
import Blogs from './pages/Blogs/Blogs.jsx';
import {EditorContextProvider} from './components/textEditor/EditorContext/EditorContext.js';
import {SocketProvider} from './context/socket/useSocket';
import CommentThread from './pages/Comment/CommentThread';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import ForgetPassword from './pages/Login/ForgetPassword.jsx';
import ChangePassword from './pages/Login/ChangePassword.jsx';
import Settings from './pages/Settings/Settings'; 
import Profile from "./pages/profile/Profile";
import Stats from "./pages/dashboard/Stats.jsx";
import ThemeProvider from './context/themeContext/ThemeContext.js';
import CreateBlog from './pages/createBlog/CreateBlog.jsx';
import EditorStateContext from './context/editorStateContext/EditorStateContext.js';
import CommentEdit from './pages/Comment/CommentEdit.jsx';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TokenContextProvider } from './context/tokenContext/useTokenContext.js';
import AdminLogin from './pages/Admin/AdminLogin.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';

function App() {
  return (
    <>
    <AuthProvider>
    <TokenContextProvider>
    <SocketProvider>
    <EditorStateContext >
    <BrowserRouter>
    <ThemeProvider>
    <ScrollToTop/>
    <Routes>
      <Route path='/admin' element={<AdminLayout/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='admin/login' element={<AdminLogin/>}></Route>
      <Route path='/forgetPassword' element={<ForgetPassword/>}></Route>
      <Route path='/changePassword/:token' element={<ChangePassword/>}></Route>
      {/* <Route path='/profile/:id' element={<Profile/>}></Route> */}
      <Route path='/signup' element={<><SignupProvider><Signup/></SignupProvider></>}></Route>
      <Route path='/upload' element={<><SignupProvider><UploadImage/></SignupProvider></>}></Route>
      <Route path='/createpassword' element={<><SignupProvider><CreatePassword/></SignupProvider></>}></Route>
      <Route path='/createBlog/:blogId?' element={
        <EditorContextProvider purpose="blog">
          <PrivateRoute>
            <CreateBlog/>
          </PrivateRoute>
        </EditorContextProvider>
        }> 
      </Route>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="/blog/:slug" element={<Blogs/>}></Route>
        <Route path="/comment/:name/:blogSlug/:commentSlug" element={<CommentThread/>}></Route>
        <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
        }></Route>
        <Route path="/editComment/:name/:blogSlug/:commentSlug" element={<PrivateRoute><CommentEdit/></PrivateRoute>}></Route>
        <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>}></Route>
        <Route path="dashboard/stats/:slug" element={<PrivateRoute><Stats/></PrivateRoute>}></Route>
        <Route path='/profile/:id' element={<Profile/>}></Route>
      </Route>
    </Routes>
    </ThemeProvider>
  </BrowserRouter> 
  </EditorStateContext>
  <ToastContainer 
  />
  </SocketProvider>
  </TokenContextProvider>
  </AuthProvider>
  </>
  )
}


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
