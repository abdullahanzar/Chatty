const express =  require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const chatbotUser = mongoose.model("chatbot-user", {
    username: "String", 
    password: "String",
    avatar: "String",
    data: {
        type: Array,
        default: []
    }
})

async function authenticate(username, password) {
    const user = await chatbotUser.findOne({username});
    return !user ? false : await bcrypt.compare(password, user.password);
}

async function isAuthenticated(req, res, next) {
    try {
        await jsonwebtoken.verify(req.headers.token, process.env.JWT_SECRET_KEY);
        next();
    }
    catch(e) {
        res.json({error: "token expired"});
    }
}

app.get("/", (req, res) => {
    res.json({server: "Running",
            health: mongoose.connection.readyState==1 ? "Looks Good" : "Unable to Connect to the Database"});
});

app.post("/register", async (req, res)=>{
    const {username, password, avatar} = req.body;
    if(!username, !password, !avatar) {
        res.json({error: "empty body"});
    }
    else if(await chatbotUser.findOne({username})) {
        res.json({error: "User already exists"});
    }
    else {
        try {
        const encryptedPassword = await bcrypt.hash(password, 2);
        await chatbotUser.create({
            username,
            password: encryptedPassword,
            avatar: avatar 
        })
        res.json({acknowledged: true,
                success: true});
        }
        catch(e) {
            console.log(e);
            res.json({error: e});
        }
    }    
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    try {
    !username || !password ? res.json({error: "empty body"}) 
    : await authenticate(username, password) ? res.json({
        login: true,
        token: await jsonwebtoken.sign({username, password}, process.env.JWT_SECRET_KEY, {expiresIn: 1800},),
        authenticated: true
    }) : res.json({
        login: false,
        authenticated: false
    })
    }
    catch(e) {
        res.json({error: e});
    }
})

app.listen(process.env.SERVER_PORT, async ()=>{
    try {
        mongoose.connect(process.env.MONGODB);
        console.log("Connected Successfully")
    }
    catch(e) {
        console.log(e);
    }
})