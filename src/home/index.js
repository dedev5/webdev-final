import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import ReviewItem from "../reviews/review-item";
import {findCoursesThunk} from "../courses/course-thunks";
import {Link} from "react-router-dom";
import {findAllReviewsThunk} from "../reviews/reviews-thunks";
import CourseItem from "../courses/course-item";

const HomePage = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {reviews} = useSelector((state) => state.reviews)
    const {courses} = useSelector((state) => state.courses)
    const dispatch = useDispatch()
    const last_reviews = reviews.slice(-5).reverse()
    const users_reviews = reviews.filter(
        review => currentUser && review.author._id === currentUser._id).slice(-5).reverse();
    let courses_with_rating = courses.map((course) => {
        const reviews_for_course = reviews.filter((review) => {
            return review.course._id === course._id
        })
        const total_score = reviews_for_course.reduce(
            (total, review) => {
                return Number(review.score) + total
            }, 0.0
        )
        const score = total_score / reviews_for_course.length
        console.log(score, course.name)
        let new_course =
            {...course,
            average_rating: score | 0.0}
        return new_course
    }).slice(0, 5)

    const sorted_coruses = courses_with_rating.sort(
        (c1, c2) => {return c2.average_rating - c1.average_rating})

    useEffect(() => {
        dispatch(findAllReviewsThunk())
        dispatch(findCoursesThunk())
    }, [])
    return(
        <>
            {
                currentUser &&
                <>
                    <h1>Welcome {currentUser.username} </h1>

                    <h2>Your Recent Reviews</h2>
                    <ul className="list-group p-2">
                    {
                        users_reviews.map((review) => <ReviewItem key={review._id} review={review} showClass={true}/>)
                    }
                    {
                        users_reviews.length === 0 &&
                        <div className="text-secondary">
                            You have not made any reviews yet.
                        </div>
                    }
                    </ul>
                </>
            }

            <br/>
            <h2>Highest Rated Classes</h2>
            <ul className="list-group p-2">
                {
                    sorted_coruses.map(
                        (course) =>
                            <CourseItem key={course._id} course={course}/>
                    )
                }
            </ul>
            <br/>
            <h2>Recently Posted Reviews</h2>
            <ul className="list-group p-2">
            {
                last_reviews.map(
                    (review) => <ReviewItem key={review._id} review={review} showClass={true}/>
                )
            }
            </ul>
        </>
    )
}

export default HomePage;