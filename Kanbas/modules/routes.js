import Database from "../Database/index.js";

function ModuleRoutes(app) {

    // Delete a Module
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        Database.modules = Database.modules.filter(
            (m) => m._id != mid
        );
        res.sendStatus(200);
    });

    // Update a Module
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = Database.modules.findIndex(
            (m) => m._id === mid
        );
        Database.modules[moduleIndex] = {
            ...Database.modules[moduleIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    // Get Modules for a Particular Course
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = Database.modules
        .filter((m) => m.course === cid);
        res.send(modules);
    });

    // Add a new Module
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString()
        };
        Database.modules.push(newModule);
        res.send(newModule);
    });
}

export default ModuleRoutes;