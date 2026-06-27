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
import { useViewportHeight } from "./hooks/useViewportHeight";

function App() {
  useViewportHeight();

  return (
    <Routes>
      <Route element={<CardLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up/password" element={<SignUpPassword />} />
      </Route>

      <Route element={<NavigationLayout />}>
        <Route element={<WebSocketLayout />}>
          <Route element={<ProtectedRouteLayout />}>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/:roomCode" element={<Room />} />
        </Route>
      </Route>

      <Route path="/*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}

export default App;
