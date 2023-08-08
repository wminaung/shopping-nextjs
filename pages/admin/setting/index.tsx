import AdminLayout from "@/ui/components/AdminLayout";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { signOut } from "next-auth/react";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const SettingPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    signOut();
    router.push("/signin");
  };

  return (
    <AdminLayout>
      <StyledContainer>
        <Typography variant="h4">Go to Home...</Typography>
        <Button
          variant="outlined"
          sx={{ marginTop: "8px" }}
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </StyledContainer>
    </AdminLayout>
  );
};

export default SettingPage;
/*


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Logout() {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    // Simulating a logout action
    // In a real-world scenario, you would implement your actual logout logic here
    const logoutAction = async () => {
      // Perform logout logic (e.g., clear tokens, cookies, etc.)

      // Redirect to the home page after logout
      router.push('/');
    };

    logoutAction();
  }, [router]);

  return (
    <Container className={classes.container}>
      <Typography variant="h4">Logging out...</Typography>
      <Button className={classes.button} variant="outlined" onClick={() => router.push('/')}>
        Go to Home
      </Button>
    </Container>
  );
}

export default Logout;

*/
