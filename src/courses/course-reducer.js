import {createSlice} from "@reduxjs/toolkit";
import {findCourseBySearchTerm} from "./course-service";
import {findCourseByIdThunk, findCourseBySearchTermThunk, findCoursesThunk} from "./course-thunks";

const initialState = {
    courses: [],
    loading: false,
    details: {}
}

const courseReducer = createSlice({
    name: 'course',
    initialState,
    extraReducers: {
        [findCoursesThunk.fulfilled]: (state, action) => {
            state.courses = action.payload
        },
        [findCourseBySearchTermThunk.fulfilled]: (state, action) => {
            state.courses = action.payload
        },
        [findCourseByIdThunk.fulfilled]: (state, action) => {
            state.details = action.payload
        }
    }
})

export default courseReducer.reducer