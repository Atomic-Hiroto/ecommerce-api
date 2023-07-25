const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
        user = user.toJSON()
        delete user.password;
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Server Error'});
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
          }, process.env.JWT_SECRET, {
            expiresIn: "12h",
        });

        res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Server Error'});
    }
}

module.exports = {
    register,
    login,
};
