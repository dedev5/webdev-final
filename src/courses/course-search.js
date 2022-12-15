import {useNavigate} from "react-router"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findCourseBySearchTermThunk} from "./course-thunks";
import {userLikesMovieThunk} from "../likes/likes-thunks";
import {Link} from "react-router-dom";
import {useParams} from "react-router";

const CourseSearch = () => {
    const {searchValue} = useParams()
    console.log(searchValue)
    const [searchTerm, setSearchTerm] = useState(searchValue)
    const {courses, loading} = useSelector((state) => state.courses)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSearchClick = () => {
        navigate(`/search/${searchTerm}`)
        dispatch(findCourseBySearchTermThunk(searchTerm))
    }

    useEffect(() => {
        console.log(searchValue)
        dispatch(findCourseBySearchTermThunk(searchValue))
    }, [])
    return (
        <>
            <ul className="list-group">
                <li key="1" className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
                        onClick={() => {
                            onSearchClick();
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
                    courses && courses.map((course) =>
                        <li key={course._id} className="list-group-item">

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