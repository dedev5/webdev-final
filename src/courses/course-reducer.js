import {createSlice} from "@reduxjs/toolkit";
import {findCourseBySearchTerm} from "./course-service";
import {findCourseByIdThunk, findCourseBySearchTermThunk} from "./course-thunks";

const initialState = {
    movies: [],
    loading: false,
    details: {}
}

const courseReducer = createSlice({
    name: 'course',
    initialState,
    extraReducers: {
        [findCourseBySearchTermThunk.fulfilled]: (state, action) => {
            state.movies = action.payload
        },
        [findCourseByIdThunk.fulfilled]: (state, action) => {
            state.details = action.payload
        }
    }
})

export default courseReducer.reducer