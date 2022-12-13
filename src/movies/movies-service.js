import axios from "axios";
const REVIEW_API_URL = 'http://localhost:4000/api/reviews'

export const createMovie = async (newMovie) => {
    const response = await axios.post(REVIEW_API_URL, newMovie)
    const actualMovie = response.data
    return actualMovie
}
export const findAllReviews = async () => {
    const response = await axios.get(REVIEW_API_URL)
    const reviews = response.data
    return reviews
}
export const updateMovie = async () => {}
export const deleteMovie = async (mid) => {
    const response = await axios.delete(`${REVIEW_API_URL}/${mid}`)
    const status = response.data
    return mid;
}