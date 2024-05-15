import express from "express";
import bodyParser from "body-parser";
const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());


app.listen(PORT, ()=>{
    console.log(`Listining on port ${PORT}`);
});
/*Data setup*/ 
var users = [
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
    response.appendHeader("content-type", "text/html");
    response.send("<H1> hello </H1>");
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
        resp.status(400).send({msg:"Bad request",description:" Invalid user id"});
    }
    const user = users.find((usr) => usr.id == id);
    if(user) {
        resp.status(200)
        .send(
            user
        );
    }else {
        resp.set(400).send({msg:"Bad request" , description: " User not found"});
    }
    
});

app.post("/api/users/user", (req, resp) => {
    const data = req.body;
    if(data)
        console.log(data);
    else {
        resp.status(400).send("Invalid data item")
    }
    const existingUsr = users.find(user => user.id === data.id);
    if(data && !existingUsr){
        users.push(data);
        resp.status(201).send(data);
    }else {
        resp.status(400).send("User already exist " );
    }
    
    
    //const usr1 = users.find(data.id);
    
});
