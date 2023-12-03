import { Knex } from "knex";
export const dbApp: Knex = require("knex")({
  client: "mysql2",
  // connection: {
  //   host: "11.1.1.6",
  //   port: 3306,
  //   user: "root",
  //   password: "Wnyhos10868",
  //   database: "hosoffice",
  // },
  connection:
    process.env.NODE_ENV == "development"
      ? {
          host: "localhost",
          port: 3306,
          user: "root",
          password: "",
          database: "hosoffice_wny",
        }
      : {
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
        done(err, conn);
      });
    },
  },
});
