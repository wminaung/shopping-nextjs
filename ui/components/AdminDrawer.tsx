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
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
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
    name: "Orders",
    url: "/admin/orders",
    icon: ShoppingCartCheckoutIcon,
  },
  {
    id: 2,
    name: "Categories",
    url: "/admin/categories",
    icon: CategoryIcon,
  },
  {
    id: 3,
    name: "Products",
    url: "/admin/products",
    icon: CheckroomIcon,
  },
  {
    id: 4,
    name: "Setting",
    url: "/admin/setting",
    icon: InboxIcon,
  },
  {
    id: 5,
    name: "Archive",
    url: "/admin/archive",
    icon: MailIcon,
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
  const path = router.asPath;

  const {
    state: {
      admin: { openDrawer },
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

  const activeNav = navLinks.filter((nav) => {
    return path.includes(nav.url);
  })[0];

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar title={title} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          color: "primary.contrastText",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "primary.text",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader
          sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
        >
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
          {navLinks.map((nav, index) => {
            const isActive = activeNav.id === nav.id;
            return (
              <Link
                key={nav.id}
                href={nav.url}
                style={{
                  textDecoration: "none",
                }}
              >
                {nav.id === 4 && <Divider />}
                <ListItem
                  disablePadding
                  style={{
                    borderRight: isActive ? "3px solid #CDBE78" : "none",
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        color: "primary.main",
                      }}
                    >
                      {<nav.icon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={nav.name}
                      sx={{ color: "primary.main" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
      <Main open={openDrawer}>
        <Box>{children}</Box>
      </Main>
    </Box>
  );
};

export default memo(AdminDrawer);
