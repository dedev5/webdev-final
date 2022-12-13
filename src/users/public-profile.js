import {Navigate, useNavigate, useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "./users-thunk";
import {findReviewsByAuthor} from "../reviews/reviews-service";
import {findReviewsByAuthorThunk} from "../reviews/reviews-thunks";
import {Link} from "react-router-dom";
import {findFollowersThunk, findFollowingThunk, followUserThunk} from "../follows/follows-thunks";
import ReviewItem from "../reviews/review-item";



const PublicProfile = () => {
    const {uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users)
    const {reviews} = useSelector((state) => state.reviews)
    const {followers, following} = useSelector((state) => state.follows)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users_reviews = reviews.filter(
        review => review.author._id === uid).slice(-5);
    let isFollowing = currentUser && followers.map(follower => follower.follower._id).includes(currentUser._id)

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
                    className="btn btn-success float-end"
                    disabled={isFollowing}>
                    Follow
                </button>
            </>
            <h1>{publicProfile && publicProfile.username}'s Pofile</h1>
            Name:
            <h3>{publicProfile && publicProfile.firstName} {publicProfile && publicProfile.lastName}</h3>
            <br/>
            <h2>Following:</h2>
            <div className="list-group">
                {
                    following && following.map((follow) =>
                        <Link to={`/profile/${follow.followed._id}`} className="list-group-item">
                            {follow.followed.username}
                        </Link>
                    )
                }
            </div>
            <br/>
            <h2>Followers:</h2>
            <div className="list-group">
                {
                    followers && followers.map((follow) =>
                        <Link to={`/profile/${follow.follower._id}`} className="list-group-item">
                            {follow.follower.username}
                        </Link>
                    )
                }
            </div>
            <br/>
            <h2>Reviews:</h2>

            <ul className="list-group">
                {
                    users_reviews && users_reviews.map((review) =>
                        <ReviewItem key={review._id} review={review}/>
                    )
                }
            </ul>
        </>
    )
}

export default PublicProfile