import App from './App';
import User from './components/User/User';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import Admin from './components/Admin/Admin';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Quiz/ManageQuiz';
import Questions from './components/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import DashBoard from './components/Admin/Content/DashBoard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';



const NotFound = () => {
    return (
        <div className="container mt-4 alert alert-danger">

            404. NOT FOUND

        </div>
    )
}

const Layout = () => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/sign-up' element={<Register />} />
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='/admins' element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <ToastContainer />
        </Suspense>
    )
}

export default Layout;