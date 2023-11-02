import { Knex } from "knex";

export const dbApp: Knex = require("knex")({
  client: "mysql2",
  connection:
    process.env.NODE_ENV == "development"
      ? {
          socketPath: "/tmp/mysql.sock",
          host: "localhost",
          port: 3306,
          user: "root",
          password: "",
          database: "hosofficedb_ksh",
        }
      : {
          // socketPath : '/tmp/mysql.sock',
          host: process.env.hostApp,
          port: process.env.portApp,
          user: process.env.userApp,
          password: process.env.passwordApp,
          database: process.env.dbApp,
        },
  pool: {
    min: 0,
    max: 10,
    afterCreate: (conn: any, done: any) => {
      conn.query("SET NAMES utf8mb4", (err: any) => {
        done(err, conn)
      });
    },
  },
});
