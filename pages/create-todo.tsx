import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

export default function CreateToDo() {
    const defaultStatus = "PENDING";
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(defaultStatus);

    const { data } = useSession();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const task = { title, description, status, user: data?.user?.name };

        try {
            const response = await fetch("/api/todos/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                setTitle("");
                setDescription("");
                setStatus(defaultStatus);

                router.push("/todo-list");
            } else {
                alert("Error creating task");
            }
        } catch (error) {
            console.error(error);
            alert("Request failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-md p-8">

                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>

                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Task</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black"
                            placeholder="Enter task description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-black text-black"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="PENDING">Pending</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
