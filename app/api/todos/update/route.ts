import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

export async function PUT(req: Request) {
    try {
        const { id, status } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedTask);
    } catch {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
