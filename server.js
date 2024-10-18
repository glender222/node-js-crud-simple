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

app.post('/api/alums', (req, res) => {
    const { nombre, apellido } = req.body;
    const query = 'INSERT INTO alumno (nombre, apellido) VALUES (?, ?)';
    
    connection.query(query, [nombre, apellido], (err, results) => {
      if (err) {
        console.error('Error al insertar alumno:', err);
        return res.status(500).send('Error en el servidor');
      }
      res.status(201).send({ nombre, apellido});
    });
  });

  // Actualizar (PUT)
app.put('/api/alums/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido } = req.body;
    const query = 'UPDATE alumno SET nombre = ?, apellido = ? WHERE idalumno = ?';
    
    connection.query(query, [nombre, apellido, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar alumno:', err);
        return res.status(500).send('Error en el servidor');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Alumno no encontrado');
      }
      res.status(200).send({ id, nombre, apellido });
    });
  });
  
  app.delete('/api/alums/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM alumno WHERE idalumno = ?';
    
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar alumno:', err);
        return res.status(500).send('Error en el servidor');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Alumno no encontrado');
      }
      res.status(200).send('Alumno eliminado');
    });
  });
 
//----------------------------------------------------------

  app.get('/api/cordin', (req, res)=>{
    const sql = 'SELECT *FROM cordinador';
    connection.query(sql,(err, results)=>{
        if (err) {
          console.log('Error en la consulta de alumnos', err);
          return res.status(500).send('Error en el servidor');
        } else {
          res.status(200).send(results);
        }
    });
  });


  app.post('/api/cordin', (req, res) => {
    const { nombre, apellido, codigo } = req.body;
    const query = 'INSERT INTO cordinador (nombre, apellido, codigo) VALUES (?, ? , ?)';
    
    connection.query(query, [nombre, apellido, codigo], (err, results) => {
      if (err) {
        console.error('Error al insertar cordinador:', err);
        return res.status(500).send('Error en el servidor');
      }
      res.status(201).send({ nombre, apellido, codigo});
    });
  });


  app.put('/api/cordin/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, codigo} = req.body;
    const query = 'UPDATE cordinador SET nombre = ?, apellido = ?, codigo = ? WHERE idcordinador = ?';
    
    connection.query(query, [nombre, apellido, codigo, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar alumno:', err);
        return res.status(500).send('Error en el servidor');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Alumno no encontrado');
      }
      res.status(200).send({ id, nombre, apellido, codigo});
    });
  });


  app.delete('/api/cordinador/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cordinador WHERE idcordinador = ?';
    
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar alumno:', err);
        return res.status(500).send('Error en el servidor');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Alumno no encontrado');
      }
      res.status(200).send('cordinador eliminado');
    });
  });
















app.listen(PORT, ()=>{
    console.log(PORT);
})