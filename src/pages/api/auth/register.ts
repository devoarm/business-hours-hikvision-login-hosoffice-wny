// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Password } from "@mui/icons-material";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbApp } from "../../../src/config/database";
var md5 = require("md5");
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Users from "../../../src/models/Users.model";
import dbConnect from "../../../src/lib/mongodb";
import connectMongoDb from "../../../src/lib/mongodb";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const session = await unstable_getServerSession(req, res, authOptions)
  // if (!session) {
  //   res.status(401).json({ status: 401, results: "noLogin" });
  //   return;
  // }
  switch (req.method) {
    case "POST":
      const data = req.body;
      // const data = JSON.parse(req.body);
      try {
        await connectMongoDb(); // connect to database
        // res.json(await Users.find());
        // const query = await dbApp("users").where({
        //   username: data.username,
        // });
        // if (query.length > 0) {
        //   return res.json({ status: 301, msg: "used username" });
        // }
        // const addUser = await dbApp("users").insert({
        //   fname: data.fname,
        //   lname: data.lname,
        //   password: md5(data.password),
        //   phone: data.phone,
        //   pname: data.pname,
        //   role: data.role,
        //   username: data.username,
        //   email: data.email,
        // });
        return res.json({ status: 200, results: data });
      } catch (error: any) {
        res.json({ status: 500, results: error.message });
      }
    default:
      break;
  }
}
