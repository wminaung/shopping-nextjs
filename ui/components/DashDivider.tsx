import React from "react";
import Typography from "@mui/material/Typography";

const DashDivider: React.FC<{ text: string }> = ({ text }) => {
  const dividerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "16px 0", // Adjust margin as needed
  };

  const dashStyle: React.CSSProperties = {
    borderBottom: "1px dashed black",
    width: "100%",
  };

  return (
    <div style={dividerStyle}>
      <span style={dashStyle}></span>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ margin: "0 10px" }}
      >
        {text}
      </Typography>
      <span style={dashStyle}></span>
    </div>
  );
};

export default DashDivider;
