const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { id: 1, name: "Badasya", email: "badasya@example.com" },
    { id: 2, name: "Test", email: "test@example.com" }
];

// POST (Create)
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required!" });
    }

    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const user = { id: newId, name, email };
    users.push(user);

    res.status(201).json(user);
});

// GET ALL (Read)
app.get('/users', (req, res) => {
    res.json(users);
});

// GET by ID (Read)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found!' });
    res.json(user);
});

// PUT (Update)
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});

// DELETE (Delete)
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found!' });
    }

    users.splice(userIndex, 1);
    res.json({ message: 'User deleted!' });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

// badasya