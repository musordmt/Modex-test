let users = [];
let nextId = 1;

const getAllUsers = (req, res) => {
    res.status(200).json(users);
}

const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        console.log('Name and email are required!')
        return res.status(400).json({ message: 'Name and email are required!'});
    }

    const user = users.find(user => user.email === email)
    if (user) {
        console.log('This email is already exist')
        return res.status(409).json({ message: 'This email already exist'});
    }

    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    console.log('User created successfully');
    res.status(201).json(newUser);
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found'});
    }
    res.status(200).json(user);
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found'});
    }
    if ( !name || !email) {
        console.log('Name and email are required');
        return res.status(400).json({ message: 'Name and email are requried' });
    }
    users[userIndex] = { id, name, email };
    console.log('User updated successfully');
    res.status(200).json(users[userIndex]);
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    console.log('User deleted successfully');
    res.status(204).json({ message: 'Deleted successfully!'});
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}