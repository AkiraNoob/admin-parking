import { Reply as ReplyIcon, Send as SendIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    Rating,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { IReview } from 'src/types/parking-lots.type';



interface ReviewComponentProps {
    review: IReview;
    onReply: (reviewId: number, comment: string) => Promise<void>;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ review, onReply }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReplySubmit = async () => {
        if (!replyText.trim()) return;

        setIsSubmitting(true);
        try {
            await onReply(review.id, replyText);
            setReplyText('');
            setShowReplyForm(false);
        } catch (error) {
            console.error('Error submitting reply:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card sx={{ mb: 2, maxWidth: 'md', width: '100%' }}>
            <CardContent>
                <Stack spacing={2}>
                    {/* User Info and Rating */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        {/* <Avatar>{review.user.name[0]}</Avatar> */}
                        <Box flex={1}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {review.user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {format(new Date(review.created), 'MMM dd, yyyy HH:mm')}
                            </Typography>
                        </Box>
                        <Rating value={review.rating} readOnly size="small" />
                    </Stack>

                    {/* Review Content */}
                    <Typography variant="body1">{review.comment}</Typography>

                    {/* Parking Lot Info */}
                    {/* <Box bgcolor="grey.50" p={1} borderRadius={1}>
                        <Typography variant="subtitle2" color="text.secondary">
                            review.parkingLot.name
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                            review.parkingLot.address
                        </Typography>
                    </Box> */}

                    {/* Reply Button */}
                    <Box>
                        <Button
                            startIcon={<ReplyIcon />}
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            size="small"
                        >
                            Reply
                        </Button>
                    </Box>

                    {/* Reply Form */}
                    <Collapse in={showReplyForm}>
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                placeholder="Write your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                disabled={isSubmitting}
                            />
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button
                                    size="small"
                                    onClick={() => setShowReplyForm(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<SendIcon />}
                                    onClick={handleReplySubmit}
                                    disabled={!replyText.trim() || isSubmitting}
                                >
                                    Send Reply
                                </Button>
                            </Stack>
                        </Stack>
                    </Collapse>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ReviewComponent;