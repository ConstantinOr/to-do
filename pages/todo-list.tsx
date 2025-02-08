import {useEffect, useState} from "react";

export interface user {
    name: string;
    email: string;
    password: string;
    id: string;
}

export interface Task{
    id: string;
    title: string;
    description: string;
    status: "PENDING" | "COMPLETED";
}

import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import TaskRow from "@/components/TaskRow";
import {ArrowLeft} from "lucide-react";

export default function ToDoList(){
    const route =  useRouter();

    const { data,  status } = useSession();
    const [tasks, setTasks] = useState([]);

    console.log(JSON.stringify(status));
    console.log(JSON.stringify(data));

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/todos/get", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) throw new Error("Query error.");

                const result = await res.json();
                setTasks(result);
            } catch (error) {
                console.error("Loading error:", error);
            }
        };

       fetchData();
    }, []);

    const handleCreateToDo = () => {
        route.push("/create-todo");
    };

    const updateAfterDelete = (id: string | null| undefined) => {
        const updatedTasks = tasks.filter((task: Task) => task.id !== id);
        setTasks(updatedTasks);
        return updatedTasks;
    }
return (
    <div className="flex-grow container mx-auto p-8 relative">
        <button
            className="absolute top-4 right-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleCreateToDo}>
            Create
        </button>

        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-white ml-10">&nbsp;&nbsp;&nbsp;&nbsp; ToDo List</h1>

        <div className="bg-white rounded-2xl shadow-md p-6 overflow-y-auto h-[70vh]">

            <button
                onClick={() => router.back()}
                className="absolute top-10 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <ul className="space-y-3">
                <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="max-w-lg mx-auto mt-6 border rounded-lg shadow-sm">
                         {tasks.map((task:Task) => (
                            <TaskRow key={task.id} id={task.id} title={task.title} description={task.description}
                                     initialStatus={task.status as "PENDING" | "COMPLETED"}
                                     deleteCallback={function (id: string | null | undefined): object {
                                         return updateAfterDelete(id);
                                     }} />
                         ))}
                    </div>
                </li>
                );
            </ul>
        </div>
    </div>
)
}