import express, { query } from "express";
import { json } from "express";

const app = express();

const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=>{
    console.log(`Listining on port ${PORT}`);
});
/*Data setup*/ 
const users = [
    { id:1,username: "mahmed", dept: "tech" },
    { id:2,username: "jPeralta", dept: "tech" },
    { id:3,username: "aKhan", dept: "tech" },
    { id:4,username: "mJadoon", dept: "tech" },
    { id:5,username: "kraaj",  dept: "hr" },
    { id:6,username: "jsmith", dept: "accts"},
    { id:7,username: "kzinto", dept: "accts"}
]
/*Routes definitions*/
app.get("/api/greet", (request, response)=> {
    response.send("<H1> hello </H1");
});

app.get("/api/users", (req, resp)=>{
    console.log("The querystring is: "+JSON.stringify(req.query));
    //Query object is parsed as a json object by node js. We can easily destructure this use destructure syntax
    const{
        query: {filter, value}
    } = req;
    //Printing parsed values
    console.log(`Parsed object is filter { filter: ${filter}, value: ${value}}`);
    if(!filter && !value) {
        resp.set(400).send({msg:"Bad request", description: "Filter and value should be provided"});
    }
    resp.set(200)
        .send(users);
});

app.get("/api/users/:id", (req, resp)=>{
    const id = req.params.id;
    console.log("The id is " +id);
    if(!id) {
        resp.set(400).send({msg:"Bad request",description:" Invalid user id"});
    }
    const user = users.find((usr) => usr.id == id);
    if(user) {
        resp.set(200)
        .send(
            user
        );
    }else {
        resp.set(400).send({msg:"Bad request" , description: " User not found"});
    }
    
});
