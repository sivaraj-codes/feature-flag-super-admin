import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Login from "./pages/login/Login";
import { Organizations } from "./pages/organizations/Organizations";
import { USER_ROLES } from "./shared/constants";
import { SALayout } from "./layout/SALayout";

function App() {
  return (
    <Routes>
      {/* default → login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* public */}
      <Route path="/login" element={<Login />} />

      {/* protected SA routes */}
      <Route
        element={
          <ProtectedRoute allowedRole={USER_ROLES.SA}>
            <SALayout />
          </ProtectedRoute>
        }
      >
        <Route path="/organizations" element={<Organizations />} />
        {/* add future SA routes here */}
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
