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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateParkingLot } from 'src/api/parking-lot/update-parking-lot';
import { Label } from 'src/components/label';
import useToggle from 'src/hooks/use-toggle';
import { EParkingLotStatus, IParkingLotDetail } from 'src/types/parking-lots.type';
import { EUserRole } from 'src/types/user.type';
import { EUserInfoKey } from 'src/utils/auth-helpers';
import { checkNullish } from 'src/utils/check-variable';
import ParkingLotsEditModal from './parking-lots-edit-modal';
// ----------------------------------------------------------------------

export type ParkingLotsProps = {} & IParkingLotDetail;

type ParkingLotsTableRowProps = {
  row: ParkingLotsProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ParkingLotsTableRow({ row, selected, onSelectRow }: ParkingLotsTableRowProps) {
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
    mutationFn: updateParkingLot,
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['parking_lots'],
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
            {row.status || EParkingLotStatus.INACTIVE}
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
          <MenuItem onClick={toggleEditModal}>
            <EditIcon />
            Chỉnh sửa
          </MenuItem>

          {row.status === EParkingLotStatus.ACTIVE && (
            <MenuItem
              onClick={() => {
                mutate({
                  ...row,
                  id: row.id,
                  status: EParkingLotStatus.SUSPENDED,
                } as any);
                handleClosePopover();
              }}
              sx={{ color: 'error.main' }}
            >
              <BlockIcon />
              Ngừng hoạt động
            </MenuItem>
          )}

          {row.status !== EParkingLotStatus.ACTIVE &&
            checkNullish(localStorage.getItem(EUserInfoKey.Role)) === EUserRole.ADMIN && (
              <MenuItem
                onClick={() => {
                  mutate({
                    ...row,
                    id: row.id,
                    status: EParkingLotStatus.ACTIVE,
                  } as any);
                  handleClosePopover();
                }}
                sx={{ color: 'Highlight' }}
              >
                <TaskAltIcon />
                Kích hoạt
              </MenuItem>
            )}
        </MenuList>
      </Popover>

      {openEditModal && (
        <ParkingLotsEditModal open={openEditModal} toggle={toggleEditModal} initialData={row} />
      )}
    </>
  );
}
