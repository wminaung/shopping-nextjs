import { Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const SignIn = () => {
  const session = useSession();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() =>
          signIn("google", { callbackUrl: "/admin", redirect: true })
        }
      >
        SignIn
      </Button>
    </div>
  );
};

export default SignIn;
