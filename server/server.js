const PORT =process.env.PORT ?? 3001
import Express from "express";
import cors from 'cors';
import Pg from 'pg';
import env from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
env.config()
const app= new Express();
app.use(Express.json())
app.use(cors())


/*user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'todoApp'*/

const pg = new Pg.Client({
    user: 'postgres',
    password: '160427',
    host: 'localhost',
    port: 5432,
    database: 'todoApp'
})
pg.connect()




app.get("/todos/:userEmail", async (req,res)=>{
    const {userEmail}=req.params
    console.log(userEmail)
    try{
        const todos=await pg.query('SELECT * FROM todos WHERE user_email= $1',[userEmail])
        res.json(todos.rows)
    }
    catch(err){
        console.log(err)
    }
})
//create todo
app.post('/todos',async (req,res)=>{
    const {user_email, title, progress, date}=req.body
    const id= uuidv4()
    console.log({user_email, title, progress, date})
    try{
        const newToDo= await pg.query('INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)',[id,user_email,title,progress,date])
    res.json(newToDo)
    }
    catch(err){
        console.log(err)
    }
})
//update todo
app.put('/todos/:id', async (req,res)=>{
    const {id}= req.params
    const {user_email, title, progress, date}=req.body
    
    console.log({user_email, title, progress, date})
    try{
        const editToDo= await pg.query('UPDATE todos set user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5;',[user_email,title,progress,date,id])
    res.json(editToDo)
    }
    catch(err){
        console.log(err)
    }
})
//delete todo
app.delete('/todos/:id', async (req,res)=>{
    const {id}= req.params
    console.log(id)
    try{
        const deleteToDo= await pg.query('DELETE FROM todos WHERE id=$1;',[id])
    res.json(deleteToDo)
    }
    catch(err){
        console.log(err)
    }
})

//signup
app.post('/signup', async (req,res)=>{
    const {email, password}= req.body
    const salt=bcrypt.genSaltSync(10)
    const hashedPassword=bcrypt.hashSync(password,salt)

    try{
        const signUp = await pg.query(`INSERT INTO users (email, hashed_pwd) VALUES($1, $2);`,
            [email, hashedPassword])
        
            const token =jwt.sign({email}, 'secret', {expiresIn: '1hr'})

            res.json({email, token})
        
    }
    catch(err){
        console.log(err)

        if (err) {
            res.json({detail:err.detail})
        }
    }
})

//login
app.post('/login',async (req,res)=>{
    const {email,password}= req.body
    try{
        const users=await pg.query('SELECT * FROM users Where email = $1', [email])

        if(!users.rows.length) return res.json({detail: 'User does not exist! '})

            const success =await bcrypt.compare(password,users.rows[0].hashed_pwd)
            const token =jwt.sign({email}, 'secret', {expiresIn: '1hr'})
            if(success){
                res.json({'email': users.rows[0].email,token})
            }
            else{
                res.json({detail: 'Invalid password! '})
            }
    }
    catch(err){
        console.log(err)
    }
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})