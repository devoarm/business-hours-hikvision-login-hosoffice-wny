import { dbApp } from "@/config/dbApp";
import md5 from "md5";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const queryUser = await dbApp("hr_person")
            .where({
              HR_USERNAME: credentials?.username,
              HR_PASSWORD: md5(credentials?.password!),
            })
            .select(
              "ID",
              "FINGLE_ID",
              "HR_CID",
              "HR_FNAME",
              "HR_LNAME",
              "HR_DEPARTMENT_ID",
              "HR_DEPARTMENT_SUB_ID",
              "HR_DEPARTMENT_SUB_SUB_ID"
            )
            .first();

          if (!queryUser) {
            return null;
          }
          const permis = await dbApp("sys_permis_list")
            .where("PERSON_ID", queryUser.ID)
            .select("PERMIS_ID");
          const mapPermis = permis.map((item: any) => {
            return item.PERMIS_ID;
          });

          const user = {
            ...queryUser,
            role: mapPermis,
          };

          return user;
        } catch (error: any) {
          console.log(error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, user, token }: any) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
