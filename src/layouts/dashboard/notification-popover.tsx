import {
    Circle as CircleIcon,
    Notifications as NotificationIcon,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Popover,
    Stack,
    Typography
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';

interface Notification {
    id: number;
    content: string;
    created_at: string;
    isRead: boolean;
    type: 'success' | 'info' | 'warning' | 'error';
}

const NotificationPopover: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [notifications] = useState<Notification[]>([
        {
            id: 1,
            content: "John Doe booked your parking slot",
            created_at: new Date().toISOString(),
            isRead: false,
            type: 'info'
        },
        {
            id: 2,
            content: "New review on your parking lot",
            created_at: new Date(Date.now() - 3600000).toISOString(),
            isRead: true,
            type: 'success'
        }
    ]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <>
            <IconButton onClick={handleClick} color="inherit">
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationIcon />
                </Badge>
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 480,
                        overflowY: 'auto',
                        mt: 1.5,
                    }
                }}
            >
                {/* Header */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 2 }}
                >
                    <Typography variant="h6">Notifications</Typography>
                    <Button size="small" color="primary">
                        Mark all as read
                    </Button>
                </Stack>

                <Divider />

                {/* Notification List */}
                <List sx={{ p: 0 }}>
                    {notifications.length === 0 ? (
                        <ListItem>
                            <ListItemText
                                primary="No notifications"
                                sx={{ textAlign: 'center', color: 'text.secondary' }}
                            />
                        </ListItem>
                    ) : (
                        notifications.map((notification) => (
                            <ListItem
                                key={notification.id}
                                sx={{
                                    bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{
                                        bgcolor: notification.type === 'success' ? 'success.main' : 'primary.main'
                                    }}>
                                        <NotificationIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {!notification.isRead && (
                                                <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                                            )}
                                            <Typography variant="body1">
                                                {notification.content}
                                            </Typography>
                                        </Stack>
                                    }
                                    secondary={
                                        <Typography variant="caption" color="text.secondary">
                                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))
                    )}
                </List>

                {notifications.length > 0 && (
                    <>
                        <Divider />
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Button color="primary" fullWidth>
                                See all notifications
                            </Button>
                        </Box>
                    </>
                )}
            </Popover>
        </>
    );
};

export default NotificationPopover;