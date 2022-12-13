import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {findAllUsersThunk} from "./users-thunk";
import {Link} from "react-router-dom";

const Users = () => {
    const {users, loading} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllUsersThunk())
    }, [])
    return(
        <>
            <h1>Users {users.length}</h1>
            <ul className="list-group">
                {
                    users.map((user) =>
                        <Link to={`/profile/${user._id}`} className="list-group-item">
                            {user.username}
                        </Link>
                    )
                }
            </ul>
        </>
    )
}

export default Users