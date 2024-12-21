import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import PATH_NAME from 'src/configs/path-name';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { EmployeeView } from 'src/sections/employee/view';
import { ParkingLotsDetailView } from 'src/sections/parking-lots-detail/view/parking-lots-detail-view';
import { ParkingLotsView } from 'src/sections/parking-lots/view';
import { varAlpha } from 'src/theme/styles';
import { EUserRole } from 'src/types/user.type';
import { EUserInfoKey } from 'src/utils/auth-helpers';
import { checkNullish } from 'src/utils/check-variable';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ActivityPage = lazy(() => import('src/pages/activity'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  const role = checkNullish(localStorage.getItem(EUserInfoKey.Role));

  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        ...(role === EUserRole.ADMIN ? [
          {
            path: PATH_NAME.Merchants.slice(1),
            element: <UserPage />,
          },
          {
            path: PATH_NAME.Activity.slice(1),
            element: <ActivityPage />,
          },
        ] : []),
        { path: PATH_NAME.ParkingEmployee.slice(1), element: <EmployeeView /> },
        {
          path: PATH_NAME.ParkingLots.slice(1),
          element: <ParkingLotsView />,
        },
        {
          path: PATH_NAME.ParkingLotDetail.slice(1),
          element: <ParkingLotsDetailView />,
        },
      ],
    },
    {
      path: PATH_NAME.SignIn.slice(1),
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
