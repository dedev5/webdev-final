import HomePage from "./home";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import courseReducer from "./courses/course-reducer";
import CourseSearch from "./courses/course-search";
import {likesReducer} from "./likes/likes-reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/review.css'
import './App.css'
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Navigation from "./navigation";
import Users from "./users";
import usersReducer from "./users/users-reducer";
import Login from "./users/login";
import Register from "./users/register";
import CurrentUser from "./users/current-user";
import Profile from "./users/profile";
import ProtectedRoute from "./users/protected-route";
import CourseDetails from "./courses/course-details";
import reviewsReducer from "./reviews/reviews-reducer";
import PublicProfile from "./users/public-profile";
import followsReducer from "./follows/follows-reducer";


const store = configureStore({
    reducer: {
        courses: courseReducer,
        likes: likesReducer,
        users: usersReducer,
        reviews: reviewsReducer,
        follows: followsReducer
    }
})

function App() {
    return (
        <div className="container mt-4 mb-4 app-bg p-1 rounded-2">
            <Provider store={store}>
                <BrowserRouter>
                    <CurrentUser>
                        <Navigation/>
                        <Routes>
                            <Route index element={<HomePage/>}/>
                            <Route path="/search" element={<CourseSearch/>}/>
                            <Route path="/search/:searchTerm" element={<CourseSearch/>}/>
                            <Route path="/users" element={
                                <ProtectedRoute>
                                    <Users/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/details/:cid" element={<CourseDetails/>}/>
                            <Route path="/profile/:uid" element={<PublicProfile/>}/>
                        </Routes>
                    </CurrentUser>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
