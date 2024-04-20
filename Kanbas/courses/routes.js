//import Database from "../Database/index.js";
import * as dao from "./dao.js";
export default function CourseRoutes(app) {

    // Get an App by Id
    const fetchCourseById = async (req, res) => {
        const { id } = req.params;
        const course = await dao.findCourseById(id);
        console.log(course);
        res.json(course);
    };

    // Update a Course
    const updateCourse = async (req, res) => {
        const { id } = req.params;
        const status = await dao.updateCourse(id, req.body);
        res.json(status);
    };

    // Get All Courses
    const fetchAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    };

    // Delete a Course
    const deleteCourse = async (req, res) => {
        const status = await dao.deleteModule(req.params.id);
        res.json(status);
    };

    // Add a New Course
    const createCourse = async (req, res) => {
        const course = {...req.body,
        id: new Date().getTime().toString()};
        res.json(await dao.createCourse(course));
    };

    app.post("/api/courses", createCourse);
    app.delete("/api/courses/:id", deleteCourse);
    app.put("/api/courses/:id", updateCourse);
    app.get("/api/courses/:id", fetchCourseById);
    app.get("/api/courses", fetchAllCourses);
    
};