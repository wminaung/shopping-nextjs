import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";

import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { motion } from "framer-motion";

interface Props {
  count: number;
}

const Navbar = ({ count }: Props) => {
  console.log(count);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" variant="elevation" color="default">
        <Toolbar sx={{ margin: "0px 80px" }}>
          <Link href={"/"}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mx: 2 }}
              >
                <HomeRoundedIcon />
              </IconButton>
            </motion.div>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            winshop {count}
          </Typography>

          <Button color="inherit" variant="outlined">
            Login
          </Button>

          <Link href={"/checkout"}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {" "}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mx: 2 }}
              >
                <ShoppingCartIcon />
              </IconButton>{" "}
            </motion.div>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
