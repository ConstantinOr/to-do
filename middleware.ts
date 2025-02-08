import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // Если пользователь не авторизован, его отправят на /login
    },
});

export const config = {
    matcher: ["/pages/todo-list.tsx", "/settings/:path*", "/app/todos/create/:path*"],
};
