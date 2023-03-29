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
      <Box className="py-8 "></Box>
      {(status === "authenticated" && children) || (
        <div className="h-96 flex justify-center flex-col items-center">
          <h1 className="text-3xl text-center ">Login please</h1>
          <Button variant="outlined" className="mt-5" onClick={() => signIn()}>
            Login
          </Button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Layout;
