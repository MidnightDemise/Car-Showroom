import { NextAuthOptions, getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectMongoDB } from "./mongodb";
import User from "@/models/userModel";

export const authConfig = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    
    ],

    callbacks: {
      async signIn({user , account})
      {
        
        if(account.provider == "google")
        {
          await connectMongoDB();
          const { name , email} = user;

          
          try {

            const userExist = await User.findOne({email});

          if(!userExist)
          {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                name,
                email,

              }),              
            })
            if(res.ok) {return user}

          }
          return user;
          
          } catch (error) {
              console.log(error);
          }
        }
      }
    }
  };
export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
  }
}