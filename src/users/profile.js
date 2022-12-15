import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk, logoutThunk, updateUserThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {findFollowersThunk, findFollowingThunk, followUserThunk} from "../follows/follows-thunks";
import {findReviewsByAuthorThunk} from "../reviews/reviews-thunks";

const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    let [username, setUsername] = useState(currentUser.username)
    let [password, setPassword] = useState(currentUser.password)
    let [email, setEmail] = useState(currentUser.email)
    let [firstName, setFirtName] = useState(currentUser.firstName)
    let [lastName, setLastName] = useState(currentUser.lastName)
    const {followers, following} = useSelector((state) => state.follows)

    useEffect(() => {
        dispatch(findUserByIdThunk(currentUser._id))
        dispatch(findReviewsByAuthorThunk(currentUser._id))
        dispatch(findFollowersThunk(currentUser._id))
        dispatch(findFollowingThunk(currentUser._id))
    }, [currentUser._id])
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
            <h1></h1>
            {
                currentUser &&
                <h2>Your Profile: @{currentUser.username}</h2>
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
            <h2>Following</h2>
            <div className="list-group">
                {
                    following && following.map((follow) =>
                        <Link to={`/profile/${follow.followed._id}`} className="list-group-item">
                            {follow.followed.username}
                        </Link>
                    )
                }
                {
                    following.length === 0 &&
                    <div className="text-secondary">
                        You are not following anyone
                    </div>
                }
            </div>

            <h2>Followers</h2>
            <div className="list-group">
                {
                    followers && followers.map((follow) =>
                        <Link to={`/profile/${follow.follower._id}`} className="list-group-item">
                            {follow.follower.username}
                        </Link>
                    )
                }
                {
                    following.length === 0 &&
                    <div className="text-secondary">
                        You have no followers
                    </div>
                }
            </div>
        </>
    )
}
export default Profile