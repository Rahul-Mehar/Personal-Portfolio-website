const express = require("express");
const mysql  = require('mysql');
const cors  = require('cors');
// const json  = require('json');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password:"",
    database: "signup"
})

app.post('/signup', (req, res) =>{
    const sql = "INSERT INTO login(Name, Email, Password) VALUES (?)";
    const values = [
        req.body.userName,
        req.body.email,
        req.body.password
    ]
    
    db.query(sql, [values], (err,data)=>{
        if(err){
            console.log("Failed to insert = "+ err);
            return res.json("Error");
        }
        console.log("Inserted Successfully");
        return res.json(data);
    })
})

app.post('/login', (req, res) =>{
console.log("email is = " +  req.body.email);
console.log("password is = " + req.body.password);

    const sql = "SELECT * FROM login WHERE Email = '"+req.body.email+"' AND Password = '" + req.body.password+"'";
    console.log("SQL Query  is = " + sql);
    
    db.query(sql, (err,data)=>{
       
        if(err){
            console.log("Failed to get = "+ err);
            return res.json("Error");
        } 
        if(data.length>0){

        console.log("login success");
        return res.json("success");
        }else{
            console.log("login Failed");
            return res.json("Failed");
        }
       
    })
})


app.listen(8081,()=>{
    console.log("listening");
})