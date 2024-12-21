import { FilterList as FilterIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Card,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { getActivities } from 'src/api/auth/activity/get-activities';
import { EUserInfoKey } from 'src/utils/auth-helpers';

interface Activity {
  id: number;
  content: string;
  created_at: string;
}

const mockActivities = [
  {
    id: 1,
    content: 'User logged in',
    created_at: '2024-12-20T09:00:00Z',
  },
  {
    id: 2,
    content: 'User updated profile',
    created_at: '2024-12-19T14:30:00Z',
  },
  {
    id: 3,
    content: 'User changed password',
    created_at: '2024-12-18T17:45:00Z',
  },
  {
    id: 4,
    content: 'User logged out',
    created_at: '2024-12-17T11:20:00Z',
  },
  {
    id: 5,
    content: 'User started a new course',
    created_at: '2024-12-16T10:05:00Z',
  },
];

const ActivityView: React.FC = () => {
  // const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = localStorage.getItem(EUserInfoKey.UserId);

  const { data: activities } = useQuery({
    queryKey: ['act', userId],
    queryFn: () => getActivities(userId as string),
    initialData: [],
    enabled: !!userId
  });

  console.log("userId", userId, activities)
  const handleDateChange = (type: 'start' | 'end', date: Dayjs | null) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.createdAt);
    const matchesDateRange =
      (!startDate || activityDate >= startDate.toDate()) &&
      (!endDate || activityDate <= endDate.toDate());
    const matchesSearchQuery =
      searchQuery === '' || activity.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDateRange && matchesSearchQuery;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Activity History
          </Typography>
          <IconButton>
            <FilterIcon />
          </IconButton>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              placeholder="Search activities..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={2}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => handleDateChange('start', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => handleDateChange('end', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </Stack>
          </Stack>
        </Paper>

        {/* Activity List */}
        <Card>
          <List>
            {filteredActivities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemText
                    primary={activity.content}
                    secondary={format(new Date(activity.createdAt), 'MMM dd, yyyy HH:mm')}
                    primaryTypographyProps={{
                      sx: { fontWeight: 'medium' },
                    }}
                    secondaryTypographyProps={{
                      sx: { color: 'text.secondary' },
                    }}
                  />
                </ListItem>
              </React.Fragment>
            ))}
            {filteredActivities.length === 0 && (
              <ListItem>
                <ListItemText
                  primary="No activities found"
                  sx={{ textAlign: 'center', color: 'text.secondary' }}
                />
              </ListItem>
            )}
          </List>
        </Card>
      </Stack>
    </Container>
  );
};

export default ActivityView;
