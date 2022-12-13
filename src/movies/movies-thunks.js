import {createAsyncThunk} from "@reduxjs/toolkit";
import {findAllReviews, createMovie, deleteMovie} from "./movies-service";

export const createMoviesThunk = createAsyncThunk(
    'createMovie',
    (newMovie) => createMovie(newMovie)
)

export const findAllReviewsThunk = createAsyncThunk(
    'findAllMovies',
    () => findAllReviews()
)

export const updateMovieThunk = {}
export const deleteMovieThunk = createAsyncThunk(
    'deleteMovie',
    (mid) => deleteMovie(mid)
)