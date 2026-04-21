import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layouts/MainLayout";
import DashboardPage from "../modules/dashboard/pages/Dashboard";
import CreateUserPage from "../modules/users/pages/CreateUser";
import UserDetailsPage from "../modules/users/pages/UserDetails";
import EditUserPage from "../modules/users/pages/EditUser";
import InvitationsListPage from "../modules/invitations/pages/InvitationsList";
import InviteUserPage from "../modules/invitations/pages/InviteUser";
import OrganizationsListPage from "../modules/organizations/pages/OrganizationsList";
import CreateOrganizationPage from "../modules/organizations/pages/CreateOrganization";
import OrganizationDetailsPage from "../modules/organizations/pages/OrganizationDetails";
import AuthenticationsSettingsPage from "../modules/settings/pages/AuthenticationSettings";
import MFASettingsPage from "../modules/settings/pages/MFASettings";
import LoginPage from "../modules/auth/pages/Login";
import UsersListPage from "../modules/users/pages/UsersList";

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

          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/new" element={<CreateUserPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          <Route path="/users/:id/edit" element={<EditUserPage />} />

          <Route path="/invitations" element={<InvitationsListPage />} />
          <Route path="/invitations/new" element={<InviteUserPage />} />

          <Route path="/organizations" element={<OrganizationsListPage />} />
          <Route path="/organizations/new" element={<CreateOrganizationPage />} />
          <Route path="/organizations/:id" element={<OrganizationDetailsPage />} />
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