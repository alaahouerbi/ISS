const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt=require('jsonwebtoken')
require("dotenv").config();

function userService() {
    /** adds a user to the database */
    async function addUser(userData) {
        return User.create(userData);
    }
    async function login(userInput) {
        const user = await getUserByEmail(userInput.email);
        if (!user) {
            throw new Error("email does not exist")
        }
      const result=await  bcrypt.compare(userInput.password, user.password)
            if(!result) throw new Error("invalid password")
            const token = jwt.sign({
                    userId: user._id
                },
                process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXP
                });
                userObj = {
                    email: user.email,
                    token
                  };
                return userObj;
            
        


    }
   

    async function getUserByEmail(email) {
        const query = {
            email: email
        };
        return User.findOne(query);
    }
    /** registers a user */
    async function register(userInput) {
        try {
            const hashedPassword = await bcrypt.hash(userInput.password, 10);
            let testerEmail = await getUserByEmail(userInput.email);
            if (testerEmail) throw new Error("email exists")
            const user = await addUser({
                ...userInput,
                password: hashedPassword
            });
            if (!user) {
                throw new Error("User cannot be created");
            }
            return user;
        } catch (err) {
            throw err;
        }
    }
    return {
        register,
        login
    };
}
module.exports = userService;