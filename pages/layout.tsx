import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Box, Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
interface Props {
  children: React.ReactNode;
  quantityList: number[];
}

const Layout = ({ children, quantityList }: Props) => {
  const { status } = useSession();

  return (
    <>
      <Navbar count={quantityList.reduce((prev, cur) => prev + cur, 0)} />
      <Box></Box>
      {(status === "authenticated" && children) || (
        <div>
          <h1>Login please</h1>
          <Button variant="outlined" onClick={() => signIn()}>
            Login
          </Button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Layout;
