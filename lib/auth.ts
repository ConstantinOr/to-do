// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user || !bcrypt.compareSync(credentials!.password, user.password)) {
                    throw new Error("Invalid email or password");
                }

                if (!user || !bcrypt.compareSync(credentials!.password, user.password)) {
                    throw new Error("Invalid credentials");
                }

                return { id: user.id, name: user.id, email: user.email };
            },
        }),
    ],
    callbacks: {
        async session({ session }) {


            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/signin',
    },
};
