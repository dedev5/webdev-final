import {Navigate, useNavigate, useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "./users-thunk";
import {findReviewsByAuthor} from "../reviews/reviews-service";
import {findReviewsByAuthorThunk} from "../reviews/reviews-thunks";
import {Link} from "react-router-dom";
import {findFollowersThunk, findFollowingThunk, followUserThunk} from "../follows/follows-thunks";



const PublicProfile = () => {
    const {uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users)
    const {reviews} = useSelector((state) => state.reviews)
    const {followers, following} = useSelector((state) => state.follows)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleUnFollowBtn = () => {

    }
    const handleFollowBtn = () => {
        if (currentUser) {
            dispatch(followUserThunk({

                followed: uid
            }))
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
        dispatch(findReviewsByAuthorThunk(uid))
        dispatch(findFollowersThunk(uid))
        dispatch(findFollowingThunk(uid))
    }, [uid])
    return(
        <>
            <>
                <button
                    onClick={handleFollowBtn}
                    className="btn btn-success float-end">
                    Follow
                </button>
            </>

            {/*<>*/}
            {/*    {!(following) && <button*/}
            {/*    onClick={handleUnFollowBtn}*/}
            {/*    className="btn btn-danger float-end">*/}
            {/*    UnFollow*/}
            {/*</button>}*/}
            {/*</>*/}


            <h1>{publicProfile && publicProfile.username}</h1>
            <h2>First Name: {publicProfile && publicProfile.firstName}</h2>
            <h2>Last Name: {publicProfile && publicProfile.lastName}</h2>

            <ul>
                {
                    reviews && reviews.map((review) =>
                    <li>
                        <Link to={`/reviews/${review._id}`}>
                        {review.review}
                        </Link>
                    </li>
                    )
                }
            </ul>

            <h2>Following</h2>
            <div className="list-group">
                {
                    following && following.map((follow) =>
                        <Link to={`/profile/${follow.followed._id}`} className="list-group-item">
                            {follow.followed.username}
                        </Link>
                    )
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
            </div>
        </>
    )
}

export default PublicProfile