const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const app  = express();
const PORT = 3000;
const connection = require('./db');
//Middlware
app.use(cors());
app.use(express.json());


app.get('/api/alums', (req, res)=>{
  const sql = 'SELECT *FROM alumno';
  connection.query(sql,(err, results)=>{
      if (err) {
        console.log('Error en la consulta de alumnos', err);
        return res.status(500).send('Error en el servidor');
      } else {
        res.status(200).send(results);
      }
  });
});


app.delete('api/alums/:id', (req, res)=>{
    const id = req.params.id;  // Obtenemos el ID desde los parámetros de la URL
    const query = 'DELETE FROM alumno WHERE id = ?';

    connection.query(query, [id],(err, results)=>{
        if (err) {
            console.log('error al borrar', err);
            return res.status(500),send('error en el servidor');
        } else {
            res.status(200).send(results);
        }
    })
})
 
app.listen(PORT, ()=>{
    console.log(PORT);
})