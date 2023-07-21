import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CategoryIcon from "@mui/icons-material/Category";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { memo, useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAdmin } from "@/src/store/slices/adminSlice";
import CheckroomIcon from "@mui/icons-material/Checkroom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

//

export const navLinks = [
  {
    id: 1,
    name: "Categories",
    url: "/admin/categories",
    icon: CategoryIcon,
  },
  {
    id: 2,
    name: "Products",
    url: "/admin/products",
    icon: CheckroomIcon,
  },
];

//

interface Props {
  children: React.ReactNode;
  title?: string;
}
const AdminDrawer = ({ children, title }: Props) => {
  const theme = useTheme();

  const router = useRouter();
  const route = router.route;

  const {
    state: {
      admin: { navTitle, openDrawer },
    },
    actions,
    dispatch,
  } = useAdmin();

  const handleDrawerOpen = () => {
    dispatch(actions.setOpenDrawer(true));
  };

  const handleDrawerClose = () => {
    dispatch(actions.setOpenDrawer(false));
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#e6e6fa" }}>
      <AdminNavbar title={title} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#e6e6fa",
          },
          bgcolor: "#e6e6fa",
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          <Typography>{title}</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <Box sx={{ display: "flex" }}>
                <ChevronLeftIcon />
              </Box>
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navLinks.map((nav, index) => (
            <Link key={nav.id} href={nav.url}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{<nav.icon />}</ListItemIcon>
                  <ListItemText primary={nav.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["Setting", "Archive"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={openDrawer}>{children}</Main>
    </Box>
  );
};

export default memo(AdminDrawer);
