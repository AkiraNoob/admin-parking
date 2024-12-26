import BlockIcon from '@mui/icons-material/Block';
import FilterListIcon from '@mui/icons-material/FilterList';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, FormControl, InputLabel, MenuItem, Popover, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction, useState } from 'react';
import { EUserStatus } from 'src/types/user.type';
// ----------------------------------------------------------------------

type EmployeeTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  status: EUserStatus;
  setStatus: Dispatch<SetStateAction<EUserStatus>>;
};

export function EmployeeTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  status,
  setStatus,
}: EmployeeTableToolbarProps) {
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
          justifyContent: 'space-between',
          p: (theme) => theme.spacing(0, 1, 0, 3),
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            Đã chọn {numSelected}
          </Typography>
        ) : (
          <div />
        )}

        {numSelected > 0 ? (
          <div>
            <Tooltip title="Kích hoạt">
              <IconButton>
                <TaskAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ngưng hoạt động">
              <IconButton>
                <BlockIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
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
