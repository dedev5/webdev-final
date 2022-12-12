import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, updateUserThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import React, {useState} from "react";

const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    let [username, setUsername] = useState(currentUser.username)
    let [password, setPassword] = useState(currentUser.password)
    let [email, setEmail] = useState(currentUser.email)
    let [firstName, setFirtName] = useState(currentUser.firstName)
    let [lastName, setLastName] = useState(currentUser.lastName)

    const dispatch = useDispatch()
    const updateUserInfoHandler = () => {
        const updatedUser = {
            ...currentUser,
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName
        }
        console.log(updatedUser)
        dispatch(updateUserThunk(updatedUser))
    }
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }
    return(
        <>
            <h1>Profile</h1>
            {
                currentUser &&
                <h2>Your Profile: {currentUser.username}</h2>
            }
            <button
                className="btn btn-danger"
                onClick={handleLogoutBtn}>
                Logout
            </button>
            <>
                <br/>
                <br/>
                <hr/>
                <h2>User Information</h2>
                <label htmlFor="userName">User Name:</label>
                <input type="text"
                       className="form-control"
                       id="userName"
                       value={username}
                        onChange={(event) => setUsername(event.target.value)}>
                </input>
                <label htmlFor="password">Password:</label>
                <input type="text"
                       className="form-control"
                       id="password"
                       value={password}
                       onChange={(event) => setPassword(event.target.value)}>
                </input>
                <label htmlFor="email">Email:</label>
                <input type="email"
                       className="form-control"
                       id="email"
                       value={email}
                       onChange={(event) => setEmail(event.target.value)}>
                </input>
                <label htmlFor="firstName">First Name:</label>
                <input type="text"
                       className="form-control"
                       id="firstName"
                       value={firstName}
                       onChange={(event) => setFirtName(event.target.value)}>
                </input>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text"
                       className="form-control"
                       id="lastName"
                       value={lastName}
                       onChange={(event) => setLastName(event.target.value)}>
                </input>
                <button
                    className="btn btn-success"
                    onClick={updateUserInfoHandler}>
                    Update User Information
                </button>
                <hr/>
            </>
            <></>
        </>
    )
}
export default Profile