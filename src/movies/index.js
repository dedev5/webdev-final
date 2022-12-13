import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createMoviesThunk, deleteMovieThunk, findAllReviewsThunk} from "./movies-thunks";
import {userLikesMovieThunk} from "../likes/likes-thunks";
import ReviewItem from "../reviews/review-item";
import {findCoursesThunk} from "../courses/course-thunks";
import {Link} from "react-router-dom";

const HomePage = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {reviews} = useSelector((state) => state.reviews)
    const {courses} = useSelector((state) => state.courses)
    const dispatch = useDispatch()
    const last_reviews = reviews.slice(-5)
    const users_reviews = reviews.filter(
        review => currentUser && review.author._id === currentUser._id).slice(-5);
    let courses_with_rating = courses.map((course) => {
        const reviews_for_course = reviews.filter((review) => {
            return review.course._id === course._id
        })
        console.log("New class")
        const total_score = reviews_for_course.reduce(
            (total, review) => {
                return Number(review.score) + total
            }, 0.0
        ) / reviews_for_course.length
        let new_course =
            {...course,
            average_rating: total_score | 0.0}
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
                    <ul className="list-group">
                    {
                        users_reviews.map((review) => <ReviewItem key={review._id} review={review}/>)
                    }
                    </ul>
                </>
            }

            <br/>
            <h2>Highest Rated Classes</h2>
            <ul className="list-group">
                {
                    sorted_coruses.map(
                        (course) => {
                            return (
                                <>
                                <li key={course._id} className="list-group-item">

                                    Name: <Link to={`/details/${course._id}`}>
                                    {course.name}

                                </Link>
                                    <br/>
                                    <b>
                                        Average Rating: {course.average_rating}
                                    </b>

                                    <br/>
                                    Number: {course.courseNumber}
                                    <br/>
                                    Section: {course.section}
                                    <br/>
                                </li>
                                </>
                            )
                        }
                    )
                }
            </ul>
            <br/>
            <h2>Recently Reviews</h2>
            <ul className="list-group">
            {
                last_reviews.map(
                    (review) => <ReviewItem key={review._id} review={review}/>
                )
            }
            </ul>
            {/*<ul className="list-group">*/}
            {/*    <li className="list-group-item">*/}
            {/*        <button className="btn btn-success float-end" onClick={() => {*/}
            {/*            dispatch(createMoviesThunk(*/}
            {/*                {*/}
            {/*                    title: movie.title*/}
            {/*                }*/}
            {/*            ))*/}
            {/*        }}>Create</button>*/}
            {/*        <input*/}
            {/*            className="form-control w-75"*/}
            {/*            onChange={(e) =>*/}
            {/*                setMovie({...movie, title: e.target.value})}*/}
            {/*            value={movie.title}/>*/}
            {/*    </li>*/}
            {/*    {*/}
            {/*        movies.map((movie) =>*/}
            {/*            <li className="list-group-item"*/}
            {/*                key={movie._id}>*/}
            {/*                <i onClick={() => {*/}
            {/*                    dispatch(deleteMovieThunk(movie._id))*/}
            {/*                }}*/}
            {/*                    className="bi bi-trash float-end"></i>*/}

            {/*                <i onClick={() => {*/}
            {/*                    dispatch(userLikesMovieThunk({*/}
            {/*                        uid: 111, mid: movie._id//imdbID*/}
            {/*                    }))*/}
            {/*                }} className="float-end bi bi-hand-thumbs-up me-2"></i>*/}
            {/*                <i className="float-end bi bi-hand-thumbs-down me-2"></i>*/}


            {/*                {movie.title}*/}
            {/*            </li>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</ul>*/}
        </>
    )
}

export default HomePage;