import {Navigate, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
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
    let startsFollowing = (currentUser && followers.map(follower => follower.follower._id).includes(currentUser._id))
    console.log("starts", startsFollowing);
    let [isFollowing, setIsFollowing] = useState(startsFollowing)

    const users_reviews = reviews.filter(
        review => review.author._id === uid).slice(-5);
    const handleFollowBtn = () => {
        setIsFollowing(true)
        console.log('incalls',isFollowing)
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
        <div className="p-2">
            <>

                <button
                    onClick={handleFollowBtn}
                    className="btn btn-success float-end"
                    disabled={isFollowing || startsFollowing}>
                    Follow
                </button>
            </>
            <h1>{publicProfile && publicProfile.username}'s Pofile</h1>
            Name:
            <h3>{publicProfile && publicProfile.firstName} {publicProfile && publicProfile.lastName}</h3>
            <br/>
            <h3>Following:</h3>
            <div className="list-group p-2">
                {
                    following && following.map((follow) =>
                        <div className="list-group-item">
                            <Link to={`/profile/${follow.followed._id}`} className="text-decoration-none">
                                {follow.followed.username}
                            </Link>
                        </div>
                    )
                }
                {
                    following.length === 0 &&
                    <div className="text-secondary">
                        This user is not following anyone
                    </div>
                }
            </div>
            <br/>
            <h3>Followers:</h3>
            <div className="list-group p-2">
                {
                    followers && followers.map((follow) =>
                    <div className="list-group-item">
                        <Link to={`/profile/${follow.follower._id}`} className="text-decoration-none">
                            {follow.follower.username}
                        </Link>
                    </div>
                    )
                }
                {
                    followers.length === 0 &&
                    <div className="text-secondary">

                        This user has no followers
                    </div>
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
                {
                    users_reviews.length === 0 &&
                    <div className="text-secondary">
                        This user has not made any reviews
                    </div>
                }
            </ul>
        </div>
    )
}

export default PublicProfile