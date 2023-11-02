// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

var md5 = require("md5");

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      const data = req.body;

      try {
        const query = await dbApp("hr_person as p")
          .where("p.HR_USERNAME", data.username)
          .where("p.HR_PASSWORD", md5(data.password))
          .select(
            "p.ID",
            "p.FINGLE_ID",
            "p.HR_CID",
            "p.HR_FNAME",
            "p.HR_LNAME",
            "p.HR_DEPARTMENT_ID",
            "p.HR_DEPARTMENT_SUB_ID",
            "p.HR_DEPARTMENT_SUB_SUB_ID"
          )
          .first();

        if (query) {
          const permis = await dbApp("sys_permis_list");
          const filterPermis = permis.filter(
            (item: any) => item.PERSON_ID == query.ID
          );
          const mapPermis = filterPermis.map((item: any) => {
            return item.PERMIS_ID;
          });
          const mapUser = {
            ...query,
            role: mapPermis,
          };
          return res.json({ status: 200, msg: mapUser });
        }
        // if (query.length > 0) {
        //   // create a jwt token that is valid for 7 days
        //   const token = jwt.sign({ sub: query.username }, "1234", {
        //     expiresIn: "7d",
        //   });
        //   return res.json({
        //     status: 200,
        //     msg: "ok",
        //     token: token,
        //     results: query[0],
        //   });
        // }

        return res.json({ status: 200, msg: "noUser" });
      } catch (error: any) {
        console.log(error.message);
        res.json({ status: 500, results: error.message });
      }
    default:
      break;
  }
}
