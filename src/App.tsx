import { Navigate, Route, Routes } from "react-router-dom";
import CardLayout from "./layout/CardLayout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpPassword from "./pages/SignUpPassword";
import NavigationLayout from "./layout/NavigationLayout";
import WebSocketLayout from "./layout/WebSocketLayout";
import ProtectedRouteLayout from "./layout/ProtectedRouteLayout";
import Rooms from "./pages/Rooms";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import WhiteBarLayout from "./layout/WhiteBarLayout";
import PublicRouteLayout from "./layout/PublicRouteLayout";

function App() {
  return (
    <Routes>
      <Route element={<PublicRouteLayout />}>
        <Route element={<CardLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up/password" element={<SignUpPassword />} />
        </Route>
      </Route>

      <Route element={<WebSocketLayout />}>
        <Route element={<NavigationLayout />}>
          <Route element={<ProtectedRouteLayout />}>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<WhiteBarLayout />}>
          <Route path="/:roomCode" element={<Room />} />
        </Route>
      </Route>

      <Route path="/*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}

export default App;
