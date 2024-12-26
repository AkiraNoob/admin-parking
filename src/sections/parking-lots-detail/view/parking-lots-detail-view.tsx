import { useCallback, useState } from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getParkinglotByID } from 'src/api/parking-lot/get-parking-lot-by-id';
import { getReviews } from 'src/api/review/get-reviews-by-parking-id';
import { getStafsByParkingLotId } from 'src/api/user/get-staffs-by-parking-id';
import ReviewComponent from 'src/components/review/review';
import { Scrollbar } from 'src/components/scrollbar';
import { hashVehicleType } from 'src/configs/hash-content';
import { DashboardContent } from 'src/layouts/dashboard';
import { EmployeeTableHead } from 'src/sections/employee/employee-table-head';
import { EmployeeTableRow } from 'src/sections/employee/employee-table-row';
import { AnalyticsWidgetSummary } from 'src/sections/overview/analytics-widget-summary';
import ParkingLotAddEmployeeButton from '../parking-lots-add-employee-button';
import ParkingLotAddVehicle from '../parking-lots-add-vehicle';
import { ParkingLotsEmployeeTableToolbar } from '../parking-lots-employee-table-toolbar';
import { TableEmptyRows } from '../table-empty-rows';
import { emptyRows } from '../utils';
// ----------------------------------------------------------------------

export function ParkingLotsDetailView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const { parkingId } = useParams();

  const { data: staffsData } = useQuery({
    queryKey: ['parking_lot_staff', parkingId],
    queryFn: () => getStafsByParkingLotId(parkingId as string),

    enabled: !!parkingId,
    initialData: {
      data: [],
      pagination: {
        currentPage: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
      },
    },
  });

  const { data: parkingLotDetail } = useQuery({
    queryKey: ['parking_lots_detail', parkingId],
    queryFn: () => getParkinglotByID(parkingId as string),

    enabled: !!parkingId,
    // initialData: ,
  });

  const { data: reviewData } = useQuery({
    queryKey: ['parking_lot_reviews', parkingId],
    queryFn: () => getReviews(parkingId as string),
    enabled: !!parkingId,
    initialData: [],
  });

  // NOTE: TEMPORARY disable filter

  // const dataFiltered: ParkingLotsEmployeeProps[] = applyFilter({
  //   inputData: [],
  //   comparator: getComparator(table.order, table.orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Typography variant="h4" flexGrow={1}>
        Bãi xe: {parkingLotDetail?.name || 'N/A'}
      </Typography>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        borderRadius="12px"
        sx={{
          backgroundColor: 'InfoBackground',
          padding: '16px',
          margin: '12px 0px 20px',
        }}
      >
        <Box display="flex" flexDirection="column" padding="12px">
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
            <strong>Địa chỉ</strong>: {parkingLotDetail?.address || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Số lượng chỗ</strong>: {parkingLotDetail?.capacity ?? 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Thời gian mở cửa</strong>:{' '}
            {parkingLotDetail?.openHour && parkingLotDetail.closeHour
              ? `${parkingLotDetail.openHour.slice(0, 5)} - ${parkingLotDetail.closeHour.slice(0, 5)}`
              : 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Loại xe</strong>:{' '}
            {parkingLotDetail?.vehicles.map((v) => v.type).join(', ') || 'N/A'}
          </Typography>
          <Box display="flex" gap="2px" flexDirection={'column'}>
            <Typography variant="body1">
              <strong>Giá</strong>:
            </Typography>
            <ul
              style={{
                margin: '0px 16px',
                padding: '0px 16px',
                listStyleType: 'initial',
              }}
            >
              {parkingLotDetail?.vehicles?.length ? (
                parkingLotDetail?.vehicles.map((vehicle, index) => (
                  <li key={index}>
                    {hashVehicleType[vehicle.type]}: {vehicle.price.toLocaleString()} VNĐ / giờ
                  </li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </Box>
        </Box>

        <ParkingLotAddVehicle />
      </Stack>

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
              total={12}
              icon={<PeopleIcon fontSize="large" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Doanh thu tháng trước"
              percent={2.8}
              total={120000}
              icon={<AttachMoneyIcon fontSize="large" />}
            />
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Danh sách nhân viên
        </Typography>
        <ParkingLotAddEmployeeButton />
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
              <EmployeeTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={staffsData.pagination.totalElements}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    staffsData.data.map((user) => user.id.toString())
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Họ và tên' },
                  { id: 'phone', label: 'Số điện thoại' },
                  { id: 'email', label: 'Email' },
                  { id: 'status', label: 'Trạng thái' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {staffsData.data
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <EmployeeTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, staffsData.data.length)}
                />
                {/* {notFound && <TableNoData searchQuery={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={staffsData.pagination.totalElements}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <Box display="flex" my={3} gap={'16px'} flexDirection={'column'}>
        <Typography variant="h4" flexGrow={1}>
          Đánh giá
        </Typography>

        <Grid container spacing={2}>
          {reviewData.length > 0 &&
            reviewData.map((review) => (
              <Grid key={review.id} xs={6}>
                <ReviewComponent review={review} parkingId={parkingId || ''} />
              </Grid>
            ))}
        </Grid>
      </Box>
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
