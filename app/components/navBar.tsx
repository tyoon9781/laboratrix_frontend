import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { guestUser, logoutUser } from "@/app/redux/slices/usersSlice";
import { useRouter } from "next/navigation";
import { authAPI } from "@/app/api/auth";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user);
  const userName = user ? user.user_name : "Guest";

  return <Box sx={{ m: 1 }}>Hello {userName}!</Box>;
};

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    try {
      await authAPI.deleteToken();
      dispatch(logoutUser());
      router.push("/");
    } catch (err) {
      console.error("Failed to delete cookie", err);
    }
  };

  return (
    <div style={{ padding: 4, textAlign: "right" }}>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

const LoginButton = () => {
  const router = useRouter();

  return (
    <div style={{ padding: 4, textAlign: "right" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/login")}
      >
        Login
      </Button>
    </div>
  );
};

const AuthButton = () => {
  const user = useSelector((state: RootState) => state.user);
  return user === guestUser ? <LoginButton /> : <LogoutButton />;
};

export default function NavBar() {
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ bgcolor: "#4a4a4a" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            cursor: "pointer",
            transition: "opacity 0.5s",
            "&:hover": {
              opacity: 0.7,
            },
          }}
          onClick={() => router.push("/")}
        >
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Search />
          </IconButton>
          <Typography variant="h6">MPLE</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <UserInfo />
          <AuthButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
