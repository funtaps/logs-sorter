import { useState } from "react";
import "./styles.css";
import { findTypes } from "./findTypes";

export default function App() {
  const [mode, setMode] = useState<"unique" | "common">("unique");
  const [jsonText, setJsonText] = useState<string>("[]");
  const [types, setTypes] = useState<string[]>([]);

  const handleShowTypes = () => {
    const parsed = JSON.parse(jsonText);
    if (!Array.isArray(parsed)) {
      setTypes([]);
      return;
    }
    setTypes(findTypes(mode, parsed));
  };

  return (
    <div className="App">
      <h1>Logs sorter</h1>

      <div className="block">
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
          className="textarea"
          placeholder='Paste a JSON array of logs, for example: [{"message":"..."}]'
        />
      </div>

      <div className="block">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "unique" | "common")}
        >
          <option value="unique">unique</option>
          <option value="common">common</option>
        </select>

        <button className="button" onClick={handleShowTypes}>
          Show Types
        </button>
      </div>

      <hr />

      <div className="block">
        <pre className="pre">{JSON.stringify(types, null, 2)}</pre>
      </div>
    </div>
  );
}
