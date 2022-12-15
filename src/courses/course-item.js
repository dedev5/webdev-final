import {Link} from "react-router-dom";


const CourseItem = (props) => {
    const course = props.course
    const colorMap = {
        0: "grey",
        1: "red",
        2: "orange",
        3: "yellow",
        4: "yellowgreen",
        5: "green"
    }
    const intScore = Math.floor(course.average_rating)
    return (
        <li className="list-group-item border-opacity-50 border-dark">
            <div className="d-flex flex-row align-items-start">
                <div className="m-0 align-self-start">
                    <div className="float-left p-2">
                        <div className={`border-5 score rounded-3 cl-${colorMap[intScore]}`}>
                            {intScore}
                        </div>
                    </div>

                </div>
                <div key={course._id} className="">

                    Name: <Link to={`/details/${course._id}`}>
                    {course.name}

                </Link>
                    <br/>
                    <b>
                        Average Rating: {course.average_rating.toFixed(1)}
                    </b>

                    <br/>
                    Number: {course.courseNumber}
                    <br/>
                    Section: {course.section}
                    <br/>
                </div>
            </div>

        </li>
    )
}

export default CourseItem