import { useCallback, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// ----------------------------------------------------------------------

export type EmployeeProps = {
  id: string;
  avatarUrl: string;
  name: string;
  parkingLotId: string;
  phone: string;
  dateJoined: string;
};

type EmployeeTableRowProps = {
  row: EmployeeProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function EmployeeTableRow({ row, selected, onSelectRow }: EmployeeTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.parkingLotId}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.dateJoined}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <MoreHorizIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <EditIcon />
            Chỉnh sửa
          </MenuItem>
          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <DeleteIcon />
            Xoá
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
