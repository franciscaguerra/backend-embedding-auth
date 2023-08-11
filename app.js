import express from 'express';
import { createPool } from 'mysql';
import cors from 'cors';

const app = express()
const port = 4000

app.use(express.json(), cors())

const conn = createPool({
  host: 'beyxl2fdnpiory1jhqi7-mysql.services.clever-cloud.com',
  database: 'beyxl2fdnpiory1jhqi7',
  user: 'u78sao3di83yranz',
  password: 'u78sao3di83yranz',
  port: '3306'
})

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password)
  conn.query(
    "INSERT INTO `users_db` (`username`, `password`) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err)
        return res.json({Error: "Inserting data Error in server"})
      }
      return res.json("Success") 
    })
})

app.get('/login', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  console.log(username, password)
  conn.query(
    "SELECT * FROM `users_db` WHERE username = ? and password = ?",
    [username, password],
    (err, data) => {
      if (err){
        console.log(err)
        return res.json({Error: "User not found"})}
      console.log(data)
      return res.json(data) 
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})