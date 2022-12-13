import {createAsyncThunk} from "@reduxjs/toolkit";
import {findCourseById, findCourseBySearchTerm, findCourses} from "./course-service";

export const findCourseBySearchTermThunk = createAsyncThunk(
    'findCourseBySearchTerm',
    (term) => findCourseBySearchTerm(term)
)
export const findCourseByIdThunk = createAsyncThunk(
    'findCourseById',
    (cid) => findCourseById(cid)
)
export const findCoursesThunk = createAsyncThunk(
    'findCourses',
    async () => await findCourses()
)