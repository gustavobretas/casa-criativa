const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./ws.db')

db.serialize(function () {
    // CRIAR TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
    // INSERIR DADOS TABELA
    const query = `
        INSERT INTO ideas(
            image, title, category, description, link
        ) values (
            ?,?,?,?,?
        );
    `
    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Cursos de Programação",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate assumenda omnis eius itaque amet quas quisquam fuga ducimus, harum tempore hic.",
        "https://rocketseat.com.br"
    ]

    // db.run(query, values, function(err) {
    //     if (err) return console.log(err)
    //     console.log(this)
    // })

    // CONSULTAR DADOS DA TABELA
    // db.all(`
    //     SELECT * FROM ideas
    // `, function(err, rows) {
    //     if (err) console.log(err)

    //     console.log(rows)
    // })

    // DELETAR DADOS DA TABELA
    // db.run(`
    //     DELETE FROM ideas where id = ?
    // `, [1], function(err){
    //     if (err) console.log(err)

    //     console.log("Deletei: ", this)
    // })
})

module.exports = db