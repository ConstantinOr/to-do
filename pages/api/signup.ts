import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }

        try {
            // Check if the user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return res.status(400).json({ error: "Email is already in use" });
            }

            // Hash the password
            const hashedPassword = bcrypt.hashSync(password, 10);
            
            // Create the user
             await prisma.user.create({
                data: {
                    email,                  
                    password: hashedPassword,
                },
            });

            res.status(201).json({ message: "User created successfully!" });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
