import React from "react";
import classes from "./FilePreviewElement.module.css";

const FilePreviewElement = ({ src }) => {
  return src ? (
    <div>
      <img src={src} className={classes.PreviewFile} alt="preview-img" />
    </div>
  ) : null;
};

export default FilePreviewElement;
