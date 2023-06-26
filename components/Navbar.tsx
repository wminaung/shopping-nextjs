import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

interface Props {
  count: number;
}

const Navbar = ({ count }: Props) => {
  const { data: session, status } = useSession();

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!count) return;
    setShowAlert(true);
    const interval = setTimeout(() => {
      setShowAlert(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  // console.log("session navbar", session, "|", status);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" variant="elevation" color="inherit">
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
            winshop
          </Typography>
          {(status !== "authenticated" && (
            <Button
              onClick={() => {
                signIn();
              }}
              color="inherit"
              variant="outlined"
            >
              Login
            </Button>
          )) || (
            <Button
              onClick={() => {
                signOut();
              }}
              color="inherit"
              variant="outlined"
            >
              Logout
            </Button>
          )}
          <Link href={"/checkout"}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mx: 2 }}
              >
                {" "}
                <Badge badgeContent={count} color="error">
                  <ShoppingCartIcon />{" "}
                </Badge>
              </IconButton>
            </motion.div>
          </Link>
          <>
            <Avatar
              alt="Remy Sharp"
              src={
                (status === "authenticated" && session.user?.image) ||
                "/profile.png"
              }
            />
          </>
        </Toolbar>
      </AppBar>
      <div>{showAlert && <Alert severity="info">Add to Cart</Alert>}</div>
    </Box>
  );
};
export default Navbar;
