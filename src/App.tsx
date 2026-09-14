import { Navigate, Route, Routes } from "react-router-dom";
import CardLayout from "./layout/CardLayout";
import Index from "./pages/Index";
import SignInPage from "./pages/SignInPage";
import NavigationLayout from "./layout/NavigationLayout";
import ProtectedRouteLayout from "./layout/ProtectedRouteLayout";
import RoomListPage from "./pages/RoomListPage";
import Profile from "./pages/Profile";
import RoomPage from "./pages/RoomPage";
import WhiteBarLayout from "./layout/WhiteBarLayout";
import PublicRouteLayout from "./layout/PublicRouteLayout";
import SignUpCompletePage from "./pages/SignUpCompletePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import QuizCreatePage from "./pages/QuizCreatePage";
import QuizListPage from "./pages/QuizListPage";
import QuizSolvePage from "./pages/QuizSolvePage";
import QuizResultPage from "./pages/QuizResultPage";
import AdminSignInPage from "./pages/AdminSignInPage";
import AdminProtectedRouteLayout from "./layout/AdminProtectedRouteLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminQuizTemplateCreatePage from "./pages/AdminQuizTemplateCreatePage";
import AdminQuizTemplateEditPage from "./pages/AdminQuizTemplateEditPage";
import QuizEditPage from "./pages/QuizEditPage";

function App() {
  return (
    <Routes>
      <Route element={<NavigationLayout />}>
        <Route path="/" element={<Index />} />
      </Route>

      <Route element={<PublicRouteLayout />}>
        <Route element={<CardLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
      </Route>

      <Route element={<CardLayout />}>
        <Route path="/sign-up/confirm" element={<SignUpCompletePage />} />
      </Route>

      <Route element={<NavigationLayout />}>
       <Route element={<WhiteBarLayout />}>
        <Route element={<ProtectedRouteLayout />}>
          <Route path="/rooms" element={<RoomListPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quizzes" element={<QuizListPage />} />
          <Route path="/quizzes/new" element={<QuizCreatePage />} />
          <Route path="/quizzes/:code/edit" element={<QuizEditPage />} />
          </Route>
        </Route>
      </Route>

      <Route element={<WhiteBarLayout />}>
        <Route path="/quizzes/:code/result" element={<QuizResultPage />} />
        <Route path="/quizzes/:code" element={<QuizSolvePage />} />
        <Route path="/:roomCode" element={<RoomPage />} />
      </Route>

      <Route element={<CardLayout />}>
        <Route path="/admin/sign-in" element={<AdminSignInPage />} />
      </Route>

      <Route element={<AdminProtectedRouteLayout />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route
            path="/admin/quiz-templates/new"
            element={<AdminQuizTemplateCreatePage />}
          />
          <Route
            path="/admin/quiz-templates/:quizTemplateId/edit"
            element={<AdminQuizTemplateEditPage />}
          />
        </Route>
      </Route>

      <Route path="/*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}

export default App;
