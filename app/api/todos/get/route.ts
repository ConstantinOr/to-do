import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.name) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const todos = await prisma.task.findMany({
            where: {
                userId: session.user.name,
            },
        });

        return NextResponse.json(todos);
    } catch (error) {
        console.error("Error fetching To-Dos:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
