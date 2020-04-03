// import server from "express";
const express = require("express")
const server = express()
const db = require("./db")

// configurar arquivos estáticos
server.use(express.static("public"))

// Habilitar Uso do Body

server.use(express.urlencoded({extended: true}))

// Configuração do Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        let reversedIdeas = [...rows].reverse()
    
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", {ideas: lastIdeas})

        // console.log(rows)
    })
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        
        let reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", {ideas: reversedIdeas, showDelete: true})
    })
})

server.post("/", function(req, res) {

    // INSERIR DADOS TABELA
    const query = `
        INSERT INTO ideas(
            image, title, category, description, link
        ) values (
            ?,?,?,?,?
        );
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        
        return res.redirect("/ideias")
    })
})

server.get("/ideias/:id/delete", function(req, res) {

    const query = `DELETE FROM ideas WHERE ID = ?`

    db.run(query, req.params.id, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        
        return res.redirect("/ideias")
    })
})

server.listen(3000)