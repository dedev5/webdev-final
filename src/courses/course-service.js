import axios from "axios";

const SEARCH_URL = 'http://localhost:4000/courses/search/'
const DETAILS_URL = 'http://localhost:4000/courses'

export const findCourseBySearchTerm = async (term) => {
    console.log(term)
    const response = await axios.get(`${SEARCH_URL}${term}`)
    return response.data
}

export const findCourseById = async (cid) => {
    const response = await axios.get(`${DETAILS_URL}/${cid}`)
    return response.data
}

export const findCourses = async () => {
    const response = await axios.get(DETAILS_URL);
    return response.data;
}