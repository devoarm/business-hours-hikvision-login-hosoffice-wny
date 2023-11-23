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
<<<<<<< HEAD
      ? {
=======
      ? {          
>>>>>>> ff611081ad271244626ca81b2a2041d29ea7e8b0
          host: "localhost",
          port: 3306,
          user: "root",
          password: "",
<<<<<<< HEAD
          database: "hosoffice_wny",
=======
          database: "hosoffice_ksh",
>>>>>>> ff611081ad271244626ca81b2a2041d29ea7e8b0
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
