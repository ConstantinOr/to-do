import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { title, description, status, user } = req.body;

            const newTask = await prisma.task.create({
                data: {
                    title,
                    description,
                    status,
                    user
                },
            });

            res.status(201).json(newTask);
        } catch{
            res.status(500).json({ error: 'Failed to create task' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}