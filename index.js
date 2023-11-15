const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;
const config = {
  host: "mysql",
  user: "root",
  password: "123",
  database: "mydb",
};

const connection = mysql.createConnection(config);

app.get("/", async (req, res) => {
  try {
    const names = ["Julio", "Joao", "Maria", "Claudio", "Mylon"];

    await names.forEach(async (name) => {
      const insertQuery = `INSERT INTO people(name) VALUES('${name}');`;
      await connection.query(insertQuery, (err, results) => {
        if (err) {
          console.error("Erro ao tentar inserir dados na base ", err);
          throw err;
        }
      });
    });

    const selectQuery = `SELECT * FROM people;`;
    await connection.query(selectQuery, (err, rows) => {
      if (err) {
        console.error(
          "Erro ao tentar recuperar a lista de nomes na base ",
          err
        );
      }

      const namesInDb = rows;
      let list = "";

      for (let i = 0; i < namesInDb.length; i++) {
        const { name = "" } = namesInDb[i];
        list += `<li>${name}</li>`;
      }

      console.log(list);

      const dataBody = `
        <h1>Full Cycle Rocks!</h1>
        <ul>
          ${list}
        </ul>
      `;
      res.send(dataBody);
    });
  } catch (err) {
    console.error(err);
  }
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar: ", err);
    throw err;
  }
  console.log("Conexão bem-sucedida ao banco de dados MySQL");

  app.listen(port, () => {
    console.log("Started in " + port + " port!!!");
  });
});
