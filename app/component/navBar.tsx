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
import { guest, setUser } from "@/app/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { deleteToken } from "@/app/utils";

const AuthLogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = () => {
    deleteToken();
    dispatch(setUser(guest));
    router.push("/");
  };
  return (
    <Box sx={{ padding: 1, textAlign: "right" }}>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

const AuthLoginButton = () => {
  const router = useRouter();
  return (
    <Box sx={{ padding: 1, textAlign: "right" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/login")}
      >
        Login
      </Button>
    </Box>
  );
};

const AuthButton = () => {
  const user = useSelector((state: RootState) => state.user);
  return user === guest ? <AuthLoginButton /> : <AuthLogoutButton />;
};

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user);
  const userName = user ? user.user_name : guest.user_name;
  return <Box>Hello {userName}</Box>;
};

const NavBarUser = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <UserInfo />
      <AuthButton />
    </Box>
  );
};

const NavBarLogo = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, transition: "opacity 0.5s", "&:hover": { opacity: 0.7 } }}
      >
        <Search />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          flexGrow: 1,
          cursor: "pointer",
          transition: "opacity 0.5s",
          "&:hover": { opacity: 0.7 },
        }}
      >
        Laboratrix
      </Typography>
    </Box>
  );
};

export default function NavBar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#4a4a4a" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <NavBarLogo />
        <NavBarUser />
      </Toolbar>
    </AppBar>
  );
}
