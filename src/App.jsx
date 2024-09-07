import script from "./assets/script.txt";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { useEffect, useState } from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";

function App() {
  const [editorFull, setEditorFull] = useState(false);
  const [previewFull, setPreviewFull] = useState(false);

  const mark = () => {
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");
    preview.innerHTML = marked.parse(editor.value);
  };

  const loadMarked = () => {
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");
    fetch(script)
      .then((r) => r.text())
      .then((text) => {
        editor.innerHTML = text;
        preview.innerHTML = marked
          .setOptions({
            breaks: true,
          })
          .parse(text);
      });
  };

  useEffect(() => {
    mark();
    loadMarked();
  }, []);

  return (
    <main className="container">
      <div className="wrapper">
        <div
          className="editor"
          style={
            editorFull
              ? { height: "100vh" }
              : previewFull
              ? { display: "none" }
              : null
          }
        >
          <div className="header-toggle">
            <h3>EDTOR</h3>
            <button
              className="expand"
              onClick={() => setEditorFull(!editorFull)}
            >
              <FaExpandArrowsAlt />
            </button>
          </div>
          <textarea
            type="text"
            name="editor"
            id="editor"
            onChange={mark}
            style={editorFull ? { height: "100%" } : null}
          ></textarea>
        </div>
        <div
          className="preview"
          style={editorFull ? { display: "none" } : null}
        >
          <div className="header-toggle">
            <h3>PREVIEW</h3>
            <button
              className="expand"
              onClick={() => setPreviewFull(!previewFull)}
            >
              <FaExpandArrowsAlt />
            </button>
          </div>
          <div id="preview"></div>
        </div>
        <div>
          <p className="name-tag">
            By{" "}
            <a href="https://github.com/arisirvandiansyah" target="blank">
              Aris Irvandiansyah
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
