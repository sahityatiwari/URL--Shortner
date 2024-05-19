const User = require("../models/user");

async function handleUsersignup(req, res) {
    const { name, email, password } = req.body;
    try {
        await User.create({ name, email, password });
        return res.redirect("/");
    } catch (error) {
        console.error("Error creating user: ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleUserlogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.render("login", { error: "Invalid login credentials" });
        }
        return res.redirect("/");
    } catch (error) {
        console.error("Error logging in user: ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { handleUsersignup, handleUserlogin };
