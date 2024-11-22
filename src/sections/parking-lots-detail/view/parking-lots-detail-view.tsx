import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { _employees, _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import { TableRow } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { AnalyticsWidgetSummary } from 'src/sections/overview/analytics-widget-summary';
import {
  ParkingLotsEmployeeProps,
  ParkingLotsEmployeeTableRow,
} from '../parking-lots-employee-row';
import { ParkingLotsEmployeeTableHead } from '../parking-lots-employee-table-head';
import { ParkingLotsEmployeeTableToolbar } from '../parking-lots-employee-table-toolbar';
import { TableEmptyRows } from '../table-empty-rows';
import { TableNoData } from '../table-no-data';
import { applyFilter, emptyRows, getComparator } from '../utils';
// ----------------------------------------------------------------------

export function ParkingLotsDetailView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: ParkingLotsEmployeeProps[] = applyFilter({
    inputData: _employees,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Typography variant="h4" flexGrow={1}>
        Bãi xe Tên bãi xe
      </Typography>

      <Box
        sx={{
          backgroundColor: 'InfoBackground',
          margin: '12px 0px 20px',
        }}
        display="flex"
        flexDirection="column"
        borderRadius="12px"
        padding="12px"
      >
        <Typography
          variant="h5"
          flexGrow={1}
          sx={{
            marginBottom: '8px',
          }}
        >
          Thông tin chi tiết
        </Typography>
        <Typography variant="body1">
          <strong>Địa chỉ</strong>: Đường Mạc Đĩnh Chi, Khu phố Tân Hòa, Phường Đông Hòa, Thành phố
          Dĩ An, Tỉnh Bình Dương
        </Typography>

        <Typography variant="body1">
          <strong>Ngày hoạt động</strong>: 10/12/2003
        </Typography>

        <Typography variant="body1">
          <strong>Số chỗ trống</strong>: 100
        </Typography>
        <Typography variant="body1">
          <strong>Loại xe</strong>: Xe máy, xe hơi
        </Typography>
        <Box display="flex" gap="8px">
          <Typography variant="body1">
            <strong>Giá tiền</strong>:
          </Typography>
          <div>
            <TableRow>Xe hơi: 20.000 VNĐ</TableRow>
            <TableRow>Xe máy: 5.000 VNĐ</TableRow>
          </div>
        </Box>
      </Box>

      <Box
        sx={{
          margin: '0px 0px 20px',
        }}
      >
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Người dùng trung bình mỗi tuần"
              percent={2.6}
              total={714000}
              icon={<PeopleIcon fontSize="large" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Doanh thu tháng trước"
              percent={2.8}
              total={1723315}
              icon={<AttachMoneyIcon fontSize="large" />}
            />
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Danh sách nhân viên
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm tài khoản nhân viên mới
        </Button>
      </Box>

      <Card>
        <ParkingLotsEmployeeTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ParkingLotsEmployeeTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Họ và tên' },
                  { id: 'phone', label: 'Số điện thoại' },
                  { id: 'dateJoined', label: 'Ngày bắt đầu' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ParkingLotsEmployeeTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`
          }
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
