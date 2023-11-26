import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
import DashboardUserProfile from './pages/DashboardUserProfile';
import SignUpPage from './pages/SignUpPage';
import ForgotLoginPage from './pages/ForgotLoginPage';
import AdminAuthPage from './pages/AdminAuthPage';
import DashboardSurveyList from './pages/DashboardSurveyList';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/userProfile" />, index:true },
        { path: 'userProfile', element: <DashboardUserProfile /> },
        { path: 'requirement', element: <UserPage /> },
        { path: 'surveyList', element: <DashboardSurveyList /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'adminAuth', element: <AdminAuthPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signUp',
      element: <SignUpPage />,
    },
    {
      path: 'forgotLogin',
      element: <ForgotLoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index:true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
