import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layouts/MainLayout";
import LoginPage from "../../modules/auth/pages/Login";
import DashboardPage from "../../modules/dashboard/pages/Dashboard";
import UsersPage from "../../modules/users/pages/Users";
import InvitationsPage from "../../modules/invitations/pages/Invitations";
import OrganizationsPage from "../../modules/organizations/pages/Organization";
import MFASettingsPage from "../../modules/settings/pages/MFASettings";
import AuthenticationsSettingsPage from "../../modules/settings/pages/AuthenticationSettings";



export default function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Everything below is protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>

          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/users" element={<UsersPage />} />


          <Route path="/invitations" element={<InvitationsPage />} />

          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/settings" element={<Navigate to="/settings/auth" replace />} />
          <Route path="/settings/auth" element={<AuthenticationsSettingsPage />} />
          <Route path="/settings/mfa" element={<MFASettingsPage />} />

        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}