const assignment = {
    id: 1, title: "NodeJS Assignment",
    description:"Create a NodeJS Server with ExpressJS",
    due:"2021-10-10", completed:false, score:0,
};

const module = {
    id:"M01", name:"NodeJS Module",
    description:"Learn NodeJS From Scratch",
    course:"Backend Development"
};

const todos = [
    {id:1, title:"Task 1", completed: false},
    {id:2, title:"Task 2", completed: true},
    {id:3, title:"Task 3", completed: false},
    {id:4, title:"Task 4", completed: true},
    {id:5, title:"Task 5", completed: true},
    {id:6, title:"Task 6", completed: false},
];
const Lab5 = (app) => {
    app.get('/a5/welcome', (req, res) => {
        res.send("Welcome to Assignment 5");
    });

    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });

    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sub = parseInt(a) - parseInt(b);
        res.send(sub.toString());
    });

    app.get("/a5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const mul = parseInt(a) * parseInt(b);
        res.send(mul.toString());
    });

    app.get("/a5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const div = parseInt(a) / parseInt(b);
        res.send(div.toString());
    });

    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch(operation) {
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            case "multiply":
                result = parseInt(a) * parseInt(b);
                break;
            case "divide":
                result = parseInt(a) / parseInt(b);
                break;
            default:
                result = "Invalid Operation";
        }
        res.send(result.toString());
    });

    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });

    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    });

    app.get("/a5/assignment/completed/:newStatus", (req, res) => {
        const { newStatus } = req.params;
        assignment.completed = newStatus == "false" ? false : true;
        res.json(assignment);
    });

    // Module APIs

    app.get("/a5/module", (req, res) => {
        res.json(module);
    });

    app.get("/a5/module/name", (req, res) => {
        res.json(module.name);
    });

    app.get("/a5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });

    app.get("/a5/module/description/:newDesc", (req, res) => {
        const { newDesc } = req.params;
        module.description = newDesc;
        res.json(module);
    });

    // Get all Todos
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed != undefined) {
            const completedBool = completed === "true";
            const completedTodos = todos.filter(
                (t) => t.completed === completedBool
            );
            res.json(completedTodos);
            return;
        }
        res.json(todos);  
    });

    // Add a new Todo Item using POST Request
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id:new Date().getTime()
        };
        todos.push(newTodo);
        res.json(newTodo);
    });

    // Add a new Todo Item
    app.get("/a5/todos/create", (req, res) => {
        const newTodo = {
            id:new Date().getTime(),
            title: "New Task",
            completed: false
        };
        todos.push(newTodo);
        res.json(todos);
    });

    //Get A Todo Item using ID
    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id == parseInt(id));
        res.json(todo);
    });

    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if(!todo) {
        res.status(404)
        .json({message: `Unable to delete Todo with ID ${id}`});
        return;
    }
    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
    });

    //Delete A Todo Item using ID
    app.get("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id == parseInt(id));
        const todoIndex = todos.indexOf(todo);
        if(todoIndex != -1) {
            todos.splice(todoIndex, 1);
        }
        res.json(todos);
    });

    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404)
              .json({ message: `Unable to update Todo with ID ${id}` });
            return;
          }      
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
      });

      
    // Update a Todo Item Title
    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find(
            (t) => t.id === parseInt(id)
        );
        todo.title = title;
        res.json(todos);
    });

    // Update a Todo Item Completed
    app.get("/a5/todos/:id/completed/:status", (req, res) => {
        const { id, status } = req.params;
        const todo = todos.find(
            (t) => t.id === parseInt(id)
        );
        todo.completed = status;
        res.json(todos);
    });

    // Update a Todo Item Description
    app.get("/a5/todos/:id/description/:desc", (req, res) => {
        const { id, desc } = req.params;
        const todo = todos.find(
            (t) => t.id === parseInt(id)
        );
        todo.description = desc;
        res.json(todos);
    });
};

export default Lab5;