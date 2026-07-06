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
import RoomPage from "./pages/RoomPage";
import RandomChatPage from "./pages/RandomChatPage";
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
            <Route path="/random" element={<RandomChatPage />} />
            <Route path="/:roomCode" element={<RoomPage />} />
          </Route>
        </Route>

        <Route path="/*" element={<Navigate to={"/"} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
