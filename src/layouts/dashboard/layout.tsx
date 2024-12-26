import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import { useEffect, useLayoutEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';

import { useNavigate } from 'react-router-dom';
import PATH_NAME from 'src/configs/path-name';
import { EUserRole } from 'src/types/user.type';
import { EUserInfoKey, getAccessToken } from 'src/utils/auth-helpers';
import { checkNullish } from 'src/utils/check-variable';
import { layoutClasses } from '../classes';
import { AccountPopover } from '../components/account-popover';
import { MenuButton } from '../components/menu-button';
import { Searchbar } from '../components/searchbar';
import { adminnNavData, merchantNavData } from '../config-nav-dashboard';
import { _workspaces } from '../config-nav-workspace';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { Main } from './main';
import { NavDesktop, NavMobile } from './nav';
import NotificationPopover from './notification-popover';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [navData, setNavData] = useState<any>([]);
  const [role, setRole] = useState<any>();
  const layoutQuery: Breakpoint = 'lg';
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    const userRole = checkNullish(localStorage.getItem(EUserInfoKey.Role));
    setNavData(userRole === EUserRole.ADMIN ? adminnNavData : merchantNavData);
    setRole(userRole);
  }, []);

  useEffect(() => {
    if (!getAccessToken()) {
      navigate(PATH_NAME.SignIn);
    }
  }, [navigate]);

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <Searchbar />
                {role === EUserRole.MERCHANT && <NotificationPopover />}
                <AccountPopover
                  data={[
                    {
                      label: 'Trang chủ',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
