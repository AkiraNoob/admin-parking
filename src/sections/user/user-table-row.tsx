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

export interface IUserRowData extends IShortenUserInformation {}

type UserTableRowProps = {
  row: IUserRowData;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
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

        <TableCell
          component="th"
          scope="row"
          style={{
            flexShrink: 0,
          }}
        >
          <Box gap={2} display="flex" alignItems="center">
            {row.name}
          </Box>
        </TableCell>

        <TableCell
          style={{
            flexShrink: 0,
          }}
        >
          {row.phoneNumber}
        </TableCell>
        <TableCell>
          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {row.email}
          </p>
        </TableCell>

        <TableCell
          style={{
            flexShrink: 0,
          }}
        >
          <Label color={(row.status !== EUserStatus.ACTIVE && 'error') || 'success'}>
            {row.status || EUserStatus.INACTIVE}
          </Label>
        </TableCell>

        <TableCell
          align="right"
          style={{
            flexShrink: 0,
          }}
        >
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
            <MenuItem onClick={handleClosePopover} sx={{ color: 'Highlight' }}>
              <TaskAltIcon />
              Kích hoạt
            </MenuItem>
          ) : (
            <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
              <BlockIcon />
              Ngưng hoạt động
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </>
  );
}
