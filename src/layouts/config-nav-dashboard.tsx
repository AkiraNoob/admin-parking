import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
import PATH_NAME from 'src/configs/path-name';
// ----------------------------------------------------------------------

export const adminnNavData = [
  {
    title: 'Homepage',
    path: PATH_NAME.HomePage,
    icon: <FormatListBulletedIcon />,
  },
  {
    title: 'Merchants list',
    path: PATH_NAME.Merchants,
    icon: <ApartmentIcon />,
  },
  {
    title: 'Employees list',
    path: PATH_NAME.ParkingEmployee,
    icon: <PeopleIcon />,
  },
  {
    title: 'Parking lots list',
    path: PATH_NAME.ParkingLots,
    icon: <DirectionsCarIcon />,
  },
  {
    title: 'Your activity',
    path: PATH_NAME.Activity,
    icon: <AccessTimeIcon />,
  },
];

export const merchantNavData = [
  {
    title: 'Homepage',
    path: PATH_NAME.HomePage,
    icon: <FormatListBulletedIcon />,
  },
  {
    title: 'Employees list',
    path: PATH_NAME.ParkingEmployee,
    icon: <PeopleIcon />,
  },
  {
    title: 'Parking lots list',
    path: PATH_NAME.ParkingLots,
    icon: <DirectionsCarIcon />,
  },
];
