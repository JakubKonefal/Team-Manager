import React from "react";
import classes from "./FilePreviewElement.module.css";
import Avatar from "@material-ui/core/Avatar";
import StylesProvider from "@material-ui/styles/StylesProvider";

const FilePreviewElement = ({ src }) => (
  <StylesProvider injectFirst>
    <Avatar
      variant="rounded"
      src={src}
      className={classes.PreviewFile}
      alt="preview-img"
    />
  </StylesProvider>
);

export default FilePreviewElement;
