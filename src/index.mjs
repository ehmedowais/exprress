import express from "express";
import { json } from "express";

const app = express();

const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=>{
    console.log(`Listining on port ${PORT}`);
});
/*Data setup*/ 
const users = [
    { "user": "mahmed", "dept": "tech" },
    { "user": "kraaj",  "dept": "hr" },
    { "user": "jsmith", "dept": "accts"},
    { "user": "kzinto", "dept": "accts"}
]
/*Routes definitions*/
app.get("/api/greet", (request, response)=> {
    response.send("<H1> hello </H1");
});

app.get("/api/users", (req, resp)=>{
    let usersAre = JSON.stringify(users);
    resp.set(200)
        .send(
            `<h1> ${usersAre} </h1>`
        );
});

app.get("/api/users/:id", (req, resp)=>{
    const id = req.params.id;
    console.log("The id is " +id);
    if(!id) {
        resp.set(400).send({msg:"Bad request",description:" Invalid user id"});
    }
    const user = users.find((usr) => usr.user === id);
    if(user) {
        resp.set(200)
        .send(
            user
        );
    }else {
        resp.set(400).send({msg:"Bad request" , description: " User not found"});
    }
    
});
