import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findCourseBySearchTermThunk} from "./course-thunks";
import {userLikesMovieThunk} from "../likes/likes-thunks";
import {Link} from "react-router-dom";

const CourseSearch = () => {
    const [searchTerm, setSearchTerm] = useState('Software Development')
    const {movies, loading} = useSelector((state) => state.omdb)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findCourseBySearchTermThunk(searchTerm))
    }, [])
    return (
        <>
            <ul className="list-group">
                <li key="1" className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
                        onClick={() => {
                            dispatch(findCourseBySearchTermThunk(searchTerm))
                        }}>Search
                    </button>
                    <input
                        className="form-control w-75"
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                        value={searchTerm}/>
                </li>
                {
                    movies && movies.map((course) =>
                        <li key={course._id} className="list-group-item">
                            {/*<i onClick={() => {*/}
                            {/*    dispatch(userLikesMovieThunk({*/}
                            {/*        uid: 111, mid: movie.imdbID*/}
                            {/*    }))*/}
                            {/*}} className="float-end bi bi-hand-thumbs-up"></i>*/}
                            Name: <Link to={`/details/${course._id}`}>
                                {course.name}
                            </Link>
                            <br/>
                            Number: {course.courseNumber}
                            <br/>
                            Section: {course.section}
                            <br/>

                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default CourseSearch