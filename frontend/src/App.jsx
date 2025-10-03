import { useState } from 'react'
import "./App.css";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text) return;
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/summarize", { text });
      setSummary(data.summary || data.error);
    } catch (err) {
      console.error(err);
      setSummary("Error connecting to backend");
    }

    setLoading(false);
  };
  
  return (
    <div className="App">
      <div className="title">✨Dora AI Summarizer✨</div>
       <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="input-box"
      />
      <button onClick={handleSummarize} className="summarize-btn">
        {loading ? "Summarizing..." : "Summarize ✨"}
      </button>
      {summary && (
        <div className="summary-box">
          <h2>Summary 🌸</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  )
}

export default App
