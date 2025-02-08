import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

console.log(JSON.stringify(req.body));

    if (!session || !session.user?.name) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { description, status, title } = await req.json();


    if (!description) {
        return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    if (!status) {
        return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    try {

        const todo = await prisma.task.create({
            data: {
                description,
                status,
                title,
                userId: session.user.name,

            },
        });

        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error("Error creating To-Do:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
