import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const UploadFile = () => {
  const [files, setFiles] = useState([]);
  const [limitMessage, setLimitMessage] = useState(false);

  const uploadLimit = 200000000000;

  const showTempMessage = () => {
    setLimitMessage(true);
    setTimeout(() => {
      setLimitMessage(false);
    }, 3000);
  };

  const onRemoveFile = (removeFile) => {
    const remainingFiles = files.filter(
      (file) => file.name !== removeFile.name
    );
    setFiles(remainingFiles);
  };

  const handleFileUpload = (acceptedFiles) => {
    const fileList = Array.from(acceptedFiles);
    console.log(fileList);
    const currentSize = files.reduce((acc, cur) => acc + cur.size, 0);
    const totalSize = fileList.reduce(
      (acc, cur) => acc + cur.size,
      currentSize
    );
    console.log(totalSize);
    if (totalSize < uploadLimit) {
      setLimitMessage(false);
      setFiles([...files, ...acceptedFiles]);
    } else {
      showTempMessage();
    }
  };
  return (
    <>
      <h1>Other</h1>
      <h4>Upload files below</h4>

      <label>
        Take a Photo{" "}
        <span id="photo-icon" class="material-icons">
          photo_camera
        </span>
        <input
          onChange={(e) => handleFileUpload(e.target.files)}
          type="file"
          multiple
          accept=".pdf, .png, image/*;capture=camera"
        />
      </label>

      <div className="file-type-req">
        File type must be a PDF, JPG, PNG, XLS, or DOC. Size must be smaller
        than 2mb.
      </div>
      <div className="upload-error-container">
        {limitMessage && (
          <h5>Files not attached, maximum total upload size is 2mb</h5>
        )}
      </div>
      <ul className="file-list-container">
        {files.map((file) => (
          <li className="file-list-item" key={file.name}>
            <span className="list-item-name">{file.name}</span>
            <span
              className="remove-file-icon"
              role="button"
              tabIndex="0"
              onKeyPress={() => onRemoveFile(file)}
              onClick={() => onRemoveFile(file)}
            >
              x
            </span>
          </li>
        ))}
      </ul>

      <button>Continue</button>
      <button>Cancel</button>
    </>
  );
};

function App() {
  return <UploadFile />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
