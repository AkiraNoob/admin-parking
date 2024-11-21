import { useCallback, useState } from 'react';

import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';
import { Label } from 'src/components/label';
// ----------------------------------------------------------------------

export enum ParkingStatusEnum {
  Active = 'active',
  Inactive = 'inactive',
}

export type ParkingLotsProps = {
  id: string;
  address: string;
  name: string;
  dateStart: string;
  status: ParkingStatusEnum;
};

type ParkingLotsTableRowProps = {
  row: ParkingLotsProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ParkingLotsTableRow({ row, selected, onSelectRow }: ParkingLotsTableRowProps) {
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
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.address}</TableCell>
        <TableCell>{row.dateStart}</TableCell>
        <TableCell
          style={{
            flexShrink: 0,
          }}
        >
          <Label color={(row.status === ParkingStatusEnum.Inactive && 'error') || 'success'}>
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <MoreHorizIcon />
          </IconButton>
        </TableCell>

        <TableCell align="right">
          <NavLink to={row.id}>
            <IconButton onClick={() => {}}>
              <OpenInNewIcon />
            </IconButton>
          </NavLink>
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

          {row.status === ParkingStatusEnum.Active ? (
            <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
              <BlockIcon />
              Dừng hoạt động
            </MenuItem>
          ) : (
            <MenuItem onClick={handleClosePopover} sx={{ color: 'Highlight' }}>
              <TaskAltIcon />
              Tái hoạt động
            </MenuItem>
          )}

          <Divider />

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <DeleteIcon />
            Xoá
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
