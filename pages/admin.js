import { useState } from "react";
import axios from "axios";

export default function Admin() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const submitFeed = async () => {

    await axios.post("http://localhost:5000/feed", {
      title,
      message,
    });

    setTitle("");
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Page</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={submitFeed}>
        Add Feed
      </button>
    </div>
  );
}