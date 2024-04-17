import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return (
    <Box sx={{ minHeight: "90vh", pb: 10, position: "relative" }}>
      <Navbar />
      {children}
      <Box sx={{ position: "relative", bottom: "-200px" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default BaseLayout;
