export enum CONNECTION_STATUS {
    FAILED = 'failed',
    PENDING = 'pending',
    SUCCESSFUL = 'successful',
}

export interface PostInterface {
    comments: PostInterface[];
    createdAt: string;
    createdBy: string;
    image: string;
    isFree: boolean;
    likes: string[];
    price: number;
    subscribers: string[];
    subscribersFromCreator: string[];
    text: string;
    _id: string;
    canBeViewed: boolean;
}

export interface User {
    email: string;
    username: string;
    createdAt: string;
    subscribers: string;
    subscribedTo: string;
    profile?: any;
}