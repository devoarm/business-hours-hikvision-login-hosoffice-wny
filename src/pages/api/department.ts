// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const query = await dbApp("hr_department").select("*");
    res.json({ status: 200, results: query });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
}
