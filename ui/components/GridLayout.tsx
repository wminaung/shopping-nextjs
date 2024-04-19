import { Grid, GridProps } from "@mui/material";
import React from "react";

interface Props extends GridProps {
  children: React.ReactNode;
}

const GridLayout = ({ children, ...gridProps }: Props) => {
  return (
    <Grid container {...gridProps}>
      {/* <Grid item xs={8}></Grid> */}
      {children}
    </Grid>
  );
};

export default GridLayout;
