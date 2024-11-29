import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import theme

function TextEditor({ value, setValue }) {
  const modules = {
    toolbar: [
      // Header
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // Font style
      [{ font: [] }],
      // Text styles
      [
        "bold",
        "italic",
        "underline",
        "strike",
        { script: "sub" },
        { script: "super" },
      ],
      // List styles
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      // Alignment
      [{ align: [] }],
      // Link, image, video
      ["link", "image", "video"],
      // Color and background
      [{ color: [] }, { background: [] }],
      // Code block
      ["code-block"],
      // Clear formatting
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "color",
    "background",
    "code-block",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value?.descHtml || ""}
      onChange={(text) => {
        setValue((prev) => ({
          ...prev,
          descHtml: text,
        }));
      }}
      modules={modules}
      formats={formats}
      className="manage-course__item__editor"
    />
  );
}
export default TextEditor;
