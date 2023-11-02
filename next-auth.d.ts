import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    ID: number;
    FINGLE_ID: number;
    HR_CID: string;
    HR_FNAME: string;
    HR_LNAME: string;
    HR_DEPARTMENT_ID: string;
    HR_DEPARTMENT_SUB_ID: string;
    HR_DEPARTMENT_SUB_SUB_ID: string;
    role: Array<string>;
  }
}
