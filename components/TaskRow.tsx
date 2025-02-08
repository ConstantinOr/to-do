"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

interface TaskProps {
    key: string,
    title: string,
    description: string,
    initialStatus: "PENDING" | "COMPLETED",
    id?: string,
    deleteCallback: (id:string|null|undefined)=>object,
}

const TaskRow: React.FC<TaskProps> = ({title, description, initialStatus, id, deleteCallback}) => {
    const [_status, setStatus] = useState<"PENDING" | "COMPLETED">(initialStatus);
    useEffect(() => {
        updateStatus();
    },[_status]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateStatus = async () => {
        try {
            console.log(`Status: ${JSON.stringify(_status)}`);
            const res = await fetch("/api/todos/update", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id, status: _status}),
            });

            if (!res.ok) throw new Error("Failed to update task");

            const updatedTask = await res.json();
            console.log("Task updated:", updatedTask);
        } catch (error) {
            console.error("Update error:", error);
        }


    }
    const handleDelete = async () => {
        try {
            const res = await fetch('/api/todos/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error('Failed to delete task');

            console.log('Task deleted:', id);
           if(deleteCallback) deleteCallback(id);
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="flex flex-col">
                <span className="text-lg font-semibold text-black">{title}</span>
                <span className="text-gray-600 text-sm text-black">{description}</span>
            </div>

            <div className="flex items-center space-x-4">
                <select
                    value={_status}
                    onChange={(e) => setStatus(e.target.value as "PENDING" | "COMPLETED")}
                    className="px-3 py-1 text-sm font-medium rounded-lg border border-gray-300 bg-white focus:outline-none text-black"
                >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                <button
                    onClick={handleClickOpen}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                    <X size={16} />
                </button>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete this task? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </div>

    );
};

export default TaskRow;
