import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className="h-96 flex flex-col items-center justify-center">
      <h1 className="text-red-700 text-3xl font-bold text-center">
        Page not Found
      </h1>
      <Button
        href="/"
        className="mt-24 text-green-500 font-extrabold font-mono hover:scale-105 transition-all"
      >
        Back To Home
      </Button>
    </div>
  );
};

export default PageNotFound;
