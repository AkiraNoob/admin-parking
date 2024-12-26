import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
import PATH_NAME from 'src/configs/path-name';
// ----------------------------------------------------------------------

export const adminnNavData = [
  {
    title: 'Trang chủ',
    path: PATH_NAME.HomePage,
    icon: <FormatListBulletedIcon />,
  },
  {
    title: 'Danh sách merchant',
    path: PATH_NAME.Merchants,
    icon: <ApartmentIcon />,
  },
  {
    title: 'Danh sách nhân viên',
    path: PATH_NAME.ParkingEmployee,
    icon: <PeopleIcon />,
  },
  {
    title: 'Danh sách bãi đỗ xe',
    path: PATH_NAME.ParkingLots,
    icon: <DirectionsCarIcon />,
  },
  {
    title: 'Hoạt động',
    path: PATH_NAME.Activity,
    icon: <AccessTimeIcon />,
  },
];

export const merchantNavData = [
  {
    title: 'Trang chủ',
    path: PATH_NAME.HomePage,
    icon: <FormatListBulletedIcon />,
  },
  {
    title: 'Danh sách nhân viên',
    path: PATH_NAME.ParkingEmployee,
    icon: <PeopleIcon />,
  },
  {
    title: 'Danh sách bãi đỗ xe',
    path: PATH_NAME.ParkingLots,
    icon: <DirectionsCarIcon />,
  },
];
