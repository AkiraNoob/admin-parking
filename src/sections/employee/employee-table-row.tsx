import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
import { Label } from 'src/components/label';
import { EUserStatus, IShortenUserInformation } from 'src/types/user.type';
// ----------------------------------------------------------------------

export type EmployeeProps = {} & IShortenUserInformation;

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
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.phoneNumber}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell
          style={{
            flexShrink: 0,
          }}
        >
          <Label color={(row.status !== EUserStatus.ACTIVE && 'error') || 'success'}>
            {row.status}
          </Label>
        </TableCell>

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

          {row.status !== EUserStatus.ACTIVE ? (
            <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
              <BlockIcon />
              Suspend
            </MenuItem>
          ) : (
            <MenuItem onClick={handleClosePopover} sx={{ color: 'Highlight' }}>
              <TaskAltIcon />
              Activate
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </>
  );
}
