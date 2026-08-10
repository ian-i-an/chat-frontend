import { Navigate, Route, Routes } from "react-router-dom";
import CardLayout from "./layout/CardLayout";
import Index from "./pages/Index";
import SignInPage from "./pages/SignInPage";
import SignUp from "./pages/SignUp";
import SignUpPassword from "./pages/SignUpPassword";
import NavigationLayout from "./layout/NavigationLayout";
import ProtectedRouteLayout from "./layout/ProtectedRouteLayout";
import RoomListPage from "./pages/RoomListPage";
import Profile from "./pages/Profile";
import RoomPage from "./pages/RoomPage";
import WhiteBarLayout from "./layout/WhiteBarLayout";
import PublicRouteLayout from "./layout/PublicRouteLayout";
import AppBackgroundLayout from "./layout/AppBackgraoudLayout";

function App() {
  return (
    <Routes>
      <Route element={<AppBackgroundLayout />}>
        <Route element={<NavigationLayout />}>
          <Route path="/" element={<Index />} />
        </Route>

        <Route element={<PublicRouteLayout />}>
          <Route element={<CardLayout />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up/password" element={<SignUpPassword />} />
          </Route>
        </Route>

        <Route element={<NavigationLayout />}>
          <Route element={<ProtectedRouteLayout />}>
            <Route path="/rooms" element={<RoomListPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<WhiteBarLayout />}>
          <Route path="/:roomCode" element={<RoomPage />} />
        </Route>

        <Route path="/*" element={<Navigate to={"/"} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
