import {createSlice} from "@reduxjs/toolkit";
import {
    createReviewThunk,
    deleteReviewThunk,
    findReviewsByAuthorThunk,
    findReviewsByCourseThunk,
    findAllReviewsThunk
} from "./reviews-thunks";

const reviewsReducer = createSlice({
    name: 'reviews',
    initialState: {
        reviews: []
    },
    extraReducers: {
        [createReviewThunk.fulfilled]: (state, action) => {
            state.reviews.push(action.payload)
        },
        [findAllReviewsThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
        [findReviewsByCourseThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
        [findReviewsByAuthorThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
        [deleteReviewThunk.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.reviews = state.reviews.filter(review => review._id !== payload)
        }
    }
})

export default reviewsReducer.reducer