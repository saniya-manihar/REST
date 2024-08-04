const express= require('express');
const app = express();
const path= require("path")
let port=8000;
const { v4: uuidv4 } = require('uuid');

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"))


app.use(express.static(path.join(__dirname,"public")));
//Ab ek views folder banayenge
// and ek or banayenge public naam se
// ab path require krna padega
//ab view engine set krna padega
// ab ham chahte hain ye saare language ya request saajh paye to ham likhtenge apne urlencidede wali line
// ab ek basic sa path set karenge
// app.get("/",(req,res)=>{
//     res.send("server running well")
// })
//then on terminal write nodemon index.js

//NEWtopic  index.route  ham ek quora templte bana rhe hain
//1-ek array create krte hain ham chahte hain hamare pass delete ka bhi option aaye hamare porject me to ham isse let keyword  me banayenge
let posts=[
    {     
        id:uuidv4(),
        username:"saniyasidiqui",
        content:"i love coding"
    },
    {
        id:uuidv4(),
        username:"NAZIL",
        content:"i hate coding"
    },
    {
        id:uuidv4(),
        username:"ZOYA",
        content:"i love shopping"
    }
]
//2- ab create krne hain api
app.get("/posts",(req,res)=>{
   // res.send("server working well hhi")
    //send ki bajaye render kara denge
    // ab saare posts bh denge jo array hain
     
     res.render("index.ejs" ,{posts})
})

// ab kya krna psts wale data ko bhjna hain to bhjnne ke bajate  ham render kra denge view wale folder s 

//NEXTtopc ceate route
// ab sike lite hame 2 route ka istmaal krna padega
// 1.serve the  Form (GET) /posts/new
//pehla wala new information leta han hamse  or usse baxkend pe bhjta hain
// 2.Add the new post  (POST)  /posts
//ye aaray me add krta hain phir

// 1. ek form render karenge
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs")
})
app.post("/posts",(req,res)=>{
    let {id}=uuidv4();
    let{ username,content}=req.body
    posts.push({ id,username,content})
    res.redirect("/posts")

})


///AB differnet pages ko connect karne ke liye express me ek bht acchi functionality hoti hain uska ham istmal krk  pages ko add kr skte hain 
//by using  res.redirect(URL)


// 3.Show route ya view route
// implement:GET/posts/:id (to get one post using id) id kuch bhi ho skte hain
//new path create krte hian
app.get("/posts/:id",  (req, res)=>{
    let {id}=req.params
    let  post=posts.find((p)=> id===p.id)
    res.render("show.ejs",post) 
   //res.send("id get successful")



})

//4.Automatic id create krna  universal unique id to uske liye express ke ander ek package hota hain UUID ke naam s 
// npm install UUID
// const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
// ham is packagese v4 ko use krne wale hain
//id alpha beta gamma use krne ke bajaye hamye likhenge 

// patch /put request  ka syntax same rehta hain= to update route
app.patch("/posts/:id",  (req, res)=>{
    let {id}=req.params;
    let{newcontent}=req.body.content
    console.log(newcontent)
    let  post=posts.find((p)=> id===p.id)
    post.content=newcontent
    console.log(post)

    res.send("patch get sucessful")
})
//html me ek prblem hoti hain html se ham sirf get and post request bhj skte hain patch request kaise bheje ab 
// ham ek package install karenge jo methods ko overwrite kr sktA HAN ye ke jugadu tareeeka hota hain
//query wala prtion k ause karenge



//6.Delete operation= destroy route