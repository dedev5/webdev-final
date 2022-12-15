import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {deleteReviewThunk} from "./reviews-thunks";
import {Link} from "react-router-dom";


const ReviewItem = (props) => {
    const review = props.review
    let showClass = false
    if ('showClass' in props) {
        showClass = props.showClass
    }
    console.log(showClass)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviewThunk(reviewId))
    }
    const canDeletePost = currentUser && (currentUser.role === "ADMIN" || currentUser._id === review.author._id)
    const colorMap = {
        1: "red",
        2: "orange",
        3: "yellow",
        4: "yellowgreen",
        5: "green"
    }
    return (
        <div className="list-group-item col-6 border-dark border-opacity-50 border-5">
            {
                showClass &&
                <div className="border-bottom m-2 border-1 border-dark border-opacity-50">
                    <Link className="text-decoration-none">
                        {review.course.courseNumber} : {review.course.name}
                    </Link>
                </div>

            }
            <div className="row">

                <div className={canDeletePost ? "col-10 d-flex flex-row align-items-start" : "col-12 d-flex flex-row align-items-start"}>
                    <div className="m-0 align-self-start">
                        <div className="float-left p-2">
                            <div className={`border-5 score rounded-3 cl-${colorMap[review.score]}`}>
                                {review.score}
                            </div>
                        </div>

                    </div>
                    <div className="d-block w-100">

                        <Link to={`/profile/${review.author._id}`} className="text-decoration-none fw-semibold">
                            {`@${review.author.username}`}
                        </Link>
                        <div className="text-body p-1 m-1 bg-dark bg-opacity-10 rounded-2 d-flex flex-fill">
                            {review.review}
                        </div>
                    </div>
                </div>
                {
                    canDeletePost &&
                    <>
                        <div className="col-2">
                            <button className="btn-danger btn"
                                    onClick={() => deleteReviewHandler(review._id)}>Delete</button>
                        </div>
                    </>

                }

            </div>

        </div>
    )
}

export default ReviewItem
