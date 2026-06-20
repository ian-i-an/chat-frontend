import { Navigate, Route, Routes } from "react-router";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import IndexPage from "./pages/IndexPage";
import NavigationLayout from "./layout/NavigationLayout";
import ChatRoomPage from "./pages/ChatRoomPage";
import ChatRoomsPage from "./pages/ChatRoomsPage";
import CardLayout from "./layout/CardLayout";
import SignUpPasswordPage from "./pages/SignUpPasswordPage";
import ProtectedRouteLayout from "./layout/ProtectedRouteLayout";
import WebSocketLayout from "./layout/WebSocketLayout";
import ProfilePage from "./pages/ProfilePage";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<CardLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-up/password" element={<SignUpPasswordPage />} />
      </Route>

      <Route element={<NavigationLayout />}>
        <Route element={<WebSocketLayout />}>
          <Route element={<ProtectedRouteLayout />}>
            <Route path="/chat-rooms" element={<ChatRoomsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/chat-rooms/:chatRoomId" element={<ChatRoomPage />} />
        </Route>
      </Route>

      <Route path="/*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}
