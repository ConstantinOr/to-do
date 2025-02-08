import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
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
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
