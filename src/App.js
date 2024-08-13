import React, { useState, useEffect } from "react";

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          type: "click",
          x: e.clientX,
          y: e.clientY,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const handleKeyDown = (e) => {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          type: "keydown",
          key: e.key,
          code: e.code,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const handleCopy = (e) => {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          type: "copy",
          text: e.clipboardData.getData("text"),
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const handlePaste = (e) => {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          type: "paste",
          text: e.clipboardData.getData("text"),
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    window.addEventListener("click", handleMouseClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("copy", handleCopy);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("copy", handleCopy);
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleSubmit = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interaction-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Recorder</h1>
      <form>
        <label>
          Name:
          <input type="text" />
        </label>
        <label>
          Email:
          <input type="email" />
        </label>
      </form>
      <button onClick={handleSubmit}>Download Interaction Data</button>
    </div>
  );
};

export default App;
