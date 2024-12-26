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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from 'src/api/user/update-user.api';
import { Label } from 'src/components/label';
import UserUpdateModal from 'src/content/user-update-modal';
import useToggle from 'src/hooks/use-toggle';
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
  const [openEditModal, toggleEditModal] = useToggle();
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['employee_list'],
        active: true,
      });
      queryClient.refetchQueries({
        queryKey: ['parking_lot_staff'],
        active: true,
      });
      toast('Cập nhật trạng thái thành công', {
        type: 'success',
      });
    },
    onError() {
      toast('Cập nhật trạng thái thất bại', {
        type: 'error',
      });
    },
  });

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
            {row.status || EUserStatus.INACTIVE}
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
          <MenuItem onClick={toggleEditModal}>
            <EditIcon />
            Chỉnh sửa
          </MenuItem>

          {row.status === EUserStatus.ACTIVE ? (
            <MenuItem
              onClick={() =>
                mutate({
                  id: row.id,
                  status: EUserStatus.SUSPENDED,
                })
              }
              sx={{ color: 'error.main' }}
            >
              <BlockIcon />
              Ngừng hoạt động
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() =>
                mutate({
                  id: row.id,
                  status: EUserStatus.ACTIVE,
                })
              }
              sx={{ color: 'Highlight' }}
            >
              <TaskAltIcon />
              Kích hoạt
            </MenuItem>
          )}
        </MenuList>
      </Popover>

      {openEditModal && (
        <UserUpdateModal
          open={openEditModal}
          toggle={toggleEditModal}
          initialData={row}
          title={'Sửa thông tin nhân viên'}
        />
      )}
    </>
  );
}
