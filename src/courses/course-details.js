import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findCourseByIdThunk, findCoursesThunk} from "./course-thunks";
import {createReviewThunk, findReviewsByCourseThunk} from "../reviews/reviews-thunks";
import ReviewItem from "../reviews/review-item";

const CourseDetails = () => {
    const {cid} = useParams()
    let [courseReview, setCourseReview] = useState('');
    let [courseScore, setCourseScore] = useState(1);
    const {reviews} = useSelector((state) => state.reviews)
    const {details} = useSelector((state) => state.courses)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const reviewClickHandler = () => {
        const newReview = {
            review: courseReview,
            score: courseScore,
            author: currentUser._id,
            course: cid
        };
        if (currentUser) {
            console.log("USER")
            console.log(currentUser)
            dispatch(createReviewThunk(newReview));
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        dispatch(findCoursesThunk())
        dispatch(findCourseByIdThunk(cid))
        dispatch(findReviewsByCourseThunk(cid))
    },[])

    return(
        <>
            <h1>{details.name} {details.courseNumber}</h1>
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        <li className="list-group-item">Department: {details.department}</li>
                        <li className="list-group-item">Course Number: {details.courseNumber}</li>
                        <li className="list-group-item">Course Name: {details.name}</li>
                        <li className="list-group-item">Section: {details.section}</li>
                    </ul>
                </div>

            </div>

            <h2>Reviews</h2>

            <textarea value={courseReview} placeholder="Your review here."
                      className="form-control border-1"
                      onChange={(event) => setCourseReview(event.target.value)}>
            </textarea>
            Score:
            <input type="number" value={courseScore}
                      className="border-1"
                      onChange={(event) => {
                          const clamped = Math.min(5,Math.max(parseInt(event.target.value),1))
                          return setCourseScore(clamped)}}>
            </input>
            <br/>
            <button className="rounded-pill btn btn-primary mt-2 ps-3 pe-3 fw-bold"
                    onClick={reviewClickHandler}>
                Post Review
            </button>
            <br/>
            <br/>
            <ul className="list-group">
                {
                    reviews.map((review) =>
                        <ReviewItem key={review._id} review={review}/>
                    )
                }
                {
                    reviews.length === 0 &&
                    <div className="text-secondary">
                        This course has no reivews
                    </div>
                }
            </ul>

        </>
    )
}
export default CourseDetails