import express from 'express'
import  {fileURLToPath} from 'url'
import { dirname } from 'path'
import bodyParser from 'body-parser'    

const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

let posts =[]

//rendering the homepage
app.get('/',(req,res)=>{
    res.render('index.ejs',{posts})
})

//new post creation page
app.get('/new',(req,res)=>{
    res.render('new.ejs')
})

//post creation

app.post('/new',(req,res)=>{
   
    const {title,content} = req.body
    posts.push({title,content})
    res.redirect('/')
})

//edit post

app.get('/edit/:id',(req,res)=>{
    const id = req.params.id;
    res.render('edit.ejs',{post:posts[id],id})
})

//route to handle post editing
app.post('/edit/:id',(req,res)=>{
    const id= req.params.id;
    const {title,content} = req.body
    posts[id]= {title,content}
    res.redirect("/")
})

//delete the post

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});




// start the server
app.listen(port,(req,res)=>{
    console.log(`Server started at ${port}`)
})

