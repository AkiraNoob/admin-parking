import Button from '@mui/material/Button';
import { Iconify } from 'src/components/iconify';
import useToggle from 'src/hooks/use-toggle';
import { EUserRole } from 'src/types/user.type';
import UserAddModal from '../../content/user-add-modal';

const UserAddButton = () => {
  const [open, toggle] = useToggle();
  return (
    <>
      <Button
        onClick={toggle}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        Thêm merchant
      </Button>
      <UserAddModal
        title="Thêm merchant"
        open={open}
        toggle={toggle}
        initialData={{
          role: EUserRole.MERCHANT,
        }}
      />
    </>
  );
};

export default UserAddButton;
