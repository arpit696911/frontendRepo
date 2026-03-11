import { useState } from "react";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!file || !email) {
      setMessage("Please upload a file and enter an email.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://backendrepo-itmg.onrender.com/analyze",
        formData
      );
      setMessage(res.data.message || "Email sent successfully.");
    } catch (err) {
      setMessage("Error sending request.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sales Insight Automator</h1>

      <form onSubmit={submit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze & Send"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}