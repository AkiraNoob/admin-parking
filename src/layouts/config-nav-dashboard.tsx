import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
// ----------------------------------------------------------------------

export const navData = [
  {
    title: 'Trang chủ',
    path: '/',
    icon: <FormatListBulletedIcon />,
  },
  {
    title: 'Danh sách doanh nghiệp',
    path: '/parking-owners',
    icon: <ApartmentIcon />,
  },
  {
    title: 'Danh sách nhân viên',
    path: '/parking-employee',
    icon: <PeopleIcon />,
  },
  {
    title: 'Danh sách bãi xe',
    path: '/parking-lots',
    icon: <DirectionsCarIcon />,
  },
];
