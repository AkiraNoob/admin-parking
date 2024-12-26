import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import { AnalyticsUserPerWeekRates } from '../analytics-user-per-week-rates';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Chào mừng trở lại 👋
      </Typography>

      <Box
        sx={{
          margin: '0px 0px 20px',
        }}
      >
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Người dùng hàng tuần"
              percent={2.6}
              total={45}
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

      <Box display="flex" flexDirection="column" gap="24px">
        <AnalyticsUserPerWeekRates
          title="Người dùng tuần trước"
          chart={{
            categories: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            series: [
              {
                data: [12, 10, 16, 20, 21, 13, 15],
                name: 'Người dùng',
              },
            ],
          }}
        />
        <AnalyticsWebsiteVisits
          title="Người dùng tháng trước"
          chart={{
            categories: Array(4)
              .fill(0)
              .map((_, index) => `Tuần ${index + 1}`),
            series: [
              {
                data: [43, 33, 22, 37],
                name: 'Người dùng',
              },
            ],
          }}
        />

        <AnalyticsWebsiteVisits
          title="Doanh thu tháng trước"
          chart={{
            categories: Array(4)
              .fill(0)
              .map((_, index) => `Tuần ${index + 1}`),
            series: [
              {
                data: [43, 33, 22, 37],
                name: 'VNĐ',
              },
            ],
            colors: ['#e0bd1d'],
          }}
        />

        <AnalyticsWebsiteVisits
          title="Doanh thu năm trước"
          chart={{
            categories: Array(12)
              .fill(0)
              .map((_, index) => `Tháng ${index + 1}`),
            series: [
              {
                data: [43, 33, 22, 37, 50, 52, 47, 49, 60, 62, 58, 55],
                name: 'VNĐ',
              },
            ],
            colors: ['#1de0b6'],
          }}
        />
      </Box>
    </DashboardContent>
  );
}
