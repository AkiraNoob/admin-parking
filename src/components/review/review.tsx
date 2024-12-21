import { Reply as ReplyIcon, Send as SendIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    Divider,
    Rating,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createReply } from 'src/api/review/create-reply';
import { getReplies } from 'src/api/review/get-replies-by-review-id';
import { ICreateReplyRequest, IReply, IReview } from 'src/types/review.type';
import { EUserInfoKey } from 'src/utils/auth-helpers';

interface ReviewComponentProps {
    review: IReview;
    parkingId: string;
}

const ReplyItem: React.FC<{ reply: IReply }> = ({ reply }) => (
    <Box sx={{ pl: 4, py: 2 }}>
        <Stack spacing={1}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Box flex={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                        {reply.user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {format(new Date(reply.created_at), 'MMM dd, yyyy HH:mm')}
                    </Typography>
                </Box>
            </Stack>
            <Typography variant="body2">{reply.comment}</Typography>
        </Stack>
    </Box>
);

const ReviewComponent: React.FC<ReviewComponentProps> = ({ review, parkingId }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient()
    const userId = localStorage.getItem(EUserInfoKey.UserId);

    const { mutate } = useMutation({
        mutationFn: createReply,
        onSuccess(data, variables, context) {
            toast('Đã trả lời đánh giá', {
                type: 'success',
            });
            setShowReplyForm(false);
            setReplyText("");
            queryClient.invalidateQueries({
                queryKey: ['parking_lot_reply', review.id],
            });
        },
        onError(error) {
            toast('Lỗi không xác định', {
                type: 'error',
            });
        },
    });

    const { data: replyData } = useQuery({
        queryKey: ['parking_lot_reply', review.id],
        queryFn: () => getReplies(review.id as string),
        initialData: [],
    });

    const handleReplySubmit = async () => {
        if (!replyText.trim()) return;
        const payload: ICreateReplyRequest = {
            comment: replyText,
            reviewId: review.id,
            userId: userId as string,
            imageUrls: "",
        }
        mutate(payload);
    };
    return (
        <Card sx={{ mb: 2, maxWidth: 'md', width: '100%' }}>
            <CardContent>
                <Stack spacing={2}>
                    {/* User Info and Rating */}
                    <Stack direction="row" spacing={2} alignItems="center">
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

                    {/* Replies Section */}
                    {replyData.length > 0 && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                    Replies ({replyData.length})
                                </Typography>
                                <Stack divider={<Divider />}>
                                    {replyData.map((reply) => (
                                        <ReplyItem key={reply.id} reply={reply} />
                                    ))}
                                </Stack>
                            </Box>
                        </>
                    )}
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