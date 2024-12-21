
export interface IActivity {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
}
export interface ICreateActivityRequest{
    content: string;
    userId: string;
}