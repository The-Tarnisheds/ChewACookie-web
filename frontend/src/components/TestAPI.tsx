import { useEffect, useState } from "react";

export default function TestAPI() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <div>Mensaje del backend: {message}</div>;
}
