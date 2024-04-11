import { Box } from "@mui/material";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return (
    <Box sx={{ minHeight: "90vh", pb: 10 }}>
      <Navbar />
      {children}
    </Box>
  );
};

export default BaseLayout;
