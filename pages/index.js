import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Home() {

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetchFeeds();

    socket.on("newFeed", (data) => {
      setFeeds((prev) => [data, ...prev]);
    });

    return () => socket.off("newFeed");
  }, []);

  const fetchFeeds = async () => {
    const res = await axios.get("http://localhost:5000/feed");

    setFeeds(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Realtime Coaching Feed</h1>

      {feeds.map((feed) => (
        <div
          key={feed._id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{feed.title}</h3>
          <p>{feed.message}</p>
        </div>
      ))}
    </div>
  );
}