var mysql = require("mysql");
var poolCluster = mysql.createPoolCluster();


poolCluster.add("node1", {
  host: "localhost",
  port: "23301",
  database: "my_database",
  user: "myUser",
  password: "123123",
  charset: "utf8mb4",
});

poolCluster.add("node2", {
  host: "localhost",
  port: "23302",
  database: "my_database",
  user: "myUser",
  password: "123123",
  charset: "utf8mb4",
});

poolCluster.add("node3", {
  host: "localhost",
  port: "23303",
  database: "my_database",
  user: "myUser",
  password: "123123",
  charset: "utf8mb4",
});

poolCluster.getConnection(function (err, connection) {
  if (err) {
    console.log(err);
  } else {
    connection.query("SELECT * FROM example", function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log("ALL FREE: ");
        console.log(rows);
        connection.release();
      }
    });
  }
});


poolCluster.getConnection("node3", "RANDOM", function (err, connection) {
  if (err) {
    console.log(err);
  } else {
    connection.query("SELECT * FROM example", function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log("ONLY NODE3: ");
        console.log(rows);
        connection.release();
      }
    });
  }
});
