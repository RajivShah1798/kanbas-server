import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function ModuleRoutes(app) {

    // Delete a Module
    const deleteModule = async (req, res) => {
        const status = await dao.deleteModule(req.params.mid);
        res.json(status);
    };

    // Update a Module
    const updateModule = async (req, res) => {
        const { mid } = req.params;
        const status = await dao.updateModule(mid, req.body);
        res.json(status);
        
    };

    // Get Modules for a Particular Course
    const fetchModulesForCourse = async (req, res) => {
        const { cid } = req.params;
        const modules = await dao.findModuleByCourseId(cid);
        res.json(modules);
    };

    // Add a new Module
    const createModule = async (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            id: "M" + new Date().getTime().toString(),
        };
        res.json(await dao.createModule(newModule));
    };
    app.delete("/api/modules/:mid", deleteModule);
    app.put("/api/modules/:mid", updateModule);
    app.post("/api/courses/:cid/modules", createModule);
    app.get("/api/courses/:cid/modules", fetchModulesForCourse);
};