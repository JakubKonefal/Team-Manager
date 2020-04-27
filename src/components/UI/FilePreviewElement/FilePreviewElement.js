import React from "react";
import classes from "./FilePreviewElement.module.css";
import Avatar from "@material-ui/core/Avatar";

const FilePreviewElement = ({ src }) => (
  <Avatar
    variant="rounded"
    src={src}
    className={classes.PreviewFile}
    alt="preview-img"
  />
);

export default FilePreviewElement;
