import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.task.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Task deleted successfully" });
    } catch  {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
