import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Page not Found</h1>
      <Button href="/">Back To Home</Button>
    </div>
  );
};

export default PageNotFound;
