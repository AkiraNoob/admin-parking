import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { getAllParkingLots } from 'src/api/parking-lot/get-all-parking-lots';
import { getParkingLotsByMerchant } from 'src/api/parking-lot/get-parking-lots-by-merchant';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';
import { EUserRole } from 'src/types/user.type';
import { EUserInfoKey } from 'src/utils/auth-helpers';
import { checkNullish } from 'src/utils/check-variable';
import ParkingLotsAddButton from '../parking-lots-add-button';
import { ParkingLotsTableHead } from '../parking-lots-table-head';
import type { ParkingLotsProps } from '../parking-lots-table-row';
import { ParkingLotsTableRow } from '../parking-lots-table-row';
import { ParkingLotsTableToolbar } from '../parking-lots-table-toolbar';
import { TableEmptyRows } from '../table-empty-rows';
import { TableNoData } from '../table-no-data';
import { applyFilter, emptyRows, getComparator } from '../utils';

// ----------------------------------------------------------------------

export function ParkingLotsView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');

  const userId = checkNullish(localStorage.getItem(EUserInfoKey.UserId));
  const role = checkNullish(localStorage.getItem(EUserInfoKey.Role));

  const { data } = useQuery({
    queryKey: ['parking_lots'],
    queryFn: () =>
      role === EUserRole.ADMIN ? getAllParkingLots() : getParkingLotsByMerchant(userId),
    enabled: !!userId,
    initialData: [],
  });

  const dataFiltered: ParkingLotsProps[] = applyFilter({
    inputData: data,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Danh sách bãi xe
        </Typography>
        <ParkingLotsAddButton />
      </Box>

      <Card>
        <ParkingLotsTableToolbar
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
              <ParkingLotsTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={data.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    data.map((parking) => parking.id.toString())
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Tên bãi xe' },
                  { id: 'address', label: 'Địa chỉ' },
                  { id: 'workingTime', label: 'Thời gian làm việc' },
                  { id: 'capacity', label: 'Chỗ trống' },
                  { id: 'status', label: 'Trạng thái' },
                  { id: 'actions' },
                  { id: 'navigate' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ParkingLotsTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, data.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={data.length}
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
