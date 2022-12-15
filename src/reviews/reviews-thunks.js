import {createAsyncThunk} from "@reduxjs/toolkit";
import {createReview, deleteReview, findAllReviews, findReviewsByAuthor, findReviewsByCourse} from "./reviews-service";
import {findUserById} from "../users/users-service";

export const createReviewThunk = createAsyncThunk(
    'createReview',
    async (review) =>
    {
        const response = await createReview(review)
        // Fill the author field out.
        response.author = await findUserById(response.author)
        // console.log(response.author)
        return response
    }
)

export const deleteReviewThunk = createAsyncThunk(
    'deleteReview',
    async (reviewId) => {
        await deleteReview(reviewId)
        return reviewId
    }
)

export const findAllReviewsThunk = createAsyncThunk(
    'findAllMovies',
    () => findAllReviews()
)

export const findReviewsByCourseThunk = createAsyncThunk(
    'findReviewsByMovieThunk',
    async (cid) => findReviewsByCourse(cid)
)

export const findReviewsByAuthorThunk = createAsyncThunk(
    'findReviewsByAuthorThunk',
    async (author) => findReviewsByAuthor(author)
)

