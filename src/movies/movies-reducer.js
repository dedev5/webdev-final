import {createSlice} from "@reduxjs/toolkit";
import {createMoviesThunk, deleteMovieThunk, findAllReviewsThunk} from "./movies-thunks";

const initialState = {
    reviews: [],
    loading: true
}

const moviesReducer = createSlice({
    name: 'movies',
    initialState: initialState,
    extraReducers: {
        [findAllReviewsThunk.fulfilled]: (state, action) => {
            state.movies = action.payload
        },
        [createMoviesThunk.fulfilled]: (state, action) => {
            state.movies.push(action.payload)
        },
        [deleteMovieThunk.fulfilled]: (state, action) => {
            // const midx = state.findIndex(m => m._id === action.payload)
            state.movies = state.movies.filter(m => {
                return m._id !== action.payload
            })
        }
    }
})

export default moviesReducer.reducer;