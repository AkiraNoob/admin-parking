import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, FormControl, InputLabel, MenuItem, Popover, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Dispatch, SetStateAction, useState } from 'react';
import { EUserStatus } from 'src/types/user.type';
// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  status: EUserStatus;
  setStatus: Dispatch<SetStateAction<EUserStatus>>;
};

export function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  status,
  setStatus,
}: UserTableToolbarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'flex-end',
          p: (theme) => theme.spacing(0, 1, 0, 3),
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        <Tooltip title="Filter list">
          <IconButton onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box minWidth={'240px'} padding={2}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Trạng thái</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as EUserStatus)}
              labelId="status-select-label"
              id="status-select"
              label="status"
              defaultValue=""
            >
              {Object.values(EUserStatus).map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Popover>
    </>
  );
}
