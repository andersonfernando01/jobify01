const express = require('express');
const sqlite3 = require('sqlite3').verbose(); 
const sqlite = require('sqlite');

const database = new sqlite3.Database('./banco.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err) {
        console.error(err.message);
    } else {
        console.log("database on");
    }
})

const app = express();




app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',async (req,res)=>{
    sql = `SELECT * FROM categorias`;
    const db = await database;

    await db.all(sql,[],(err,rows)=>{

            res.render('home',{rows,vagas});
           
    });

    
     
 
   
})

app.get('/vaga',(req,res)=>{
    
    res.render('vaga')
})

app.get('*',(req,res)=>{

})


init =async ()=>{
    db = await database;
    
    //sql=`CREATE TABLE IF NOT EXISTS categorias(id INTEGER PRIMARY KEY,categoria TEXT)`;
    //sql= `CREATE TABLE IF NOT EXISTS vagas( id INTEGER,titulo TEXT,descricao TEXT, categoriaId INTEGER, FOREIGN KEY(categoriaId) REFERENCES categorias(id))`;
   //sql = `drop table categorias`;
    await db.run(sql,(err)=>{
        if (err) {
            console.error(err.message);
        } else {
            console.log("table created successfully");
        }
    })

/*
    sql2 =`INSERT INTO vagas(categoria,titulo,descricao)VALUES(?,?,?)`;
    db.run(sql2,[2,"Marketing Digital(San Francisco)","Vaga para Marketing Digital para trabalhar remotamente em sao Fracisco"],(err)=>{
        if(err) return console.error(err.message);
        console.log("data saved");
    })

    */
    
}

init();

app.listen(5000,(err)=>{
    if (err) {
        console.log("[ERR]:server not run");
    }
    console.log('server running on port 5000');
})

