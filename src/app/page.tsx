"use client";

import TaskList from "@/components/TaskList";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: input }),
      });

      // console.log('Response status:', res)
      const data = await res.json();
      console.log('Response:', data)
      setTasks(data.agenda || []); // Assuming the response contains an 'agenda' field

      // setTasks(data.output[0].content[0].text)
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind for this session or tomorrow?"
          className="w-full rounded-xl bg-zinc-800 text-white placeholder-zinc-400 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold hover:bg-indigo-500 transition"
        >
          Submit
        </button>
      </div>

      <TaskList tasks={tasks} />
    </main>
  );
}
