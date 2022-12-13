import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {deleteReviewThunk} from "./reviews-thunks";
import {Link} from "react-router-dom";


const ReviewItem = (props) => {
    const review = props.review
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviewThunk(review._id))
    }
    const canDeletePost = currentUser && (currentUser.role === "ADMIN" || currentUser._id === review.author._id)

    return (
        <li className="list-group-item">
            {
                canDeletePost &&
                <i className="bi bi-x-lg float-end"
                   onClick={() => deleteReviewHandler(review._id)}></i>
            }
            {review.review}
            <br/>
            Rating: {review.score} / 5
            <br/>
            -
            <Link to={`/profile/${review.author._id}`}>
                {review.author.username}
            </Link>

        </li>
    )
}

export default ReviewItem
