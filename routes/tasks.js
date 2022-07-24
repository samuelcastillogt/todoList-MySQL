const router = require('express').Router();
const { query } = require('../libs/dbConfing.js');
const connection = require("../libs/dbConfing.js")

router.get("/", (req, res)=>{
    connection.query(
        "select * from tasks where active = 1", (err, results)=>{
          res.send(results)
        }
      )
})
router.get("/:id", (req, res)=>{
    const {id}= req.params
    connection.query(
        `select * from tasks where post_id = ${id}`, (err, results)=>{
          res.send(results)
        }
      )
})
router.post("/create", (req, res)=>{
    const data = req.body
    connection.query(
        `insert into tasks set ?`, {
          title: data.title,
          descripcion: data.descripcion,
          fecha: data.fecha,
        }, (err, results)=>{
          res.send(err)
        }
      )
})
router.get("/delete/:id", (req, res)=>{
  const {id} = req.params
  connection.query(`UPDATE tasks SET finished = 1 WHERE id = ${id}`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
})
router.get("/reactive/:id", (req, res)=>{
  const {id} = req.params
  connection.query(`UPDATE tasks SET finished = 0 WHERE id = ${id}`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
})
router.get("/remove/:id", (req, res)=>{
  const {id} = req.params
  connection.query(`UPDATE tasks SET active = 0 WHERE id = ${id}`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
})
module.exports= router