import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Label } from 'src/components/label';
import { EParkingLotStatus, IParkingLotDetail } from 'src/types/parking-lots.type';
// ----------------------------------------------------------------------

export type ParkingLotsProps = {} & IParkingLotDetail;

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
        <TableCell>
          {row.openHour.slice(0, 5)} - {row.closeHour.slice(0, 5)}
        </TableCell>
        <TableCell>{row.capacity}</TableCell>
        <TableCell
          style={{
            flexShrink: 0,
          }}
        >
          <Label color={(row.status !== EParkingLotStatus.ACTIVE && 'error') || 'success'}>
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <MoreHorizIcon />
          </IconButton>
        </TableCell>

        <TableCell align="right">
          <NavLink to={row.id.toString()}>
            <IconButton>
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
            Edit
          </MenuItem>

          {row.status === EParkingLotStatus.ACTIVE ? (
            <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
              <BlockIcon />
              Suspend
            </MenuItem>
          ) : (
            <MenuItem onClick={handleClosePopover} sx={{ color: 'Highlight' }}>
              <TaskAltIcon />
              Re activate
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </>
  );
}
