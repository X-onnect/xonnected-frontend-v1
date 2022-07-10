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
    _id: string;
    profile: Profile;
}

export interface Profile {
    image: string;
    displayName: string;
    subscriptionPrice: string;
}

export interface PostSubscriptionDto {
    postId: string;
    postCreatorId: string;
    amount: number;
}

export enum SubscriptionType {
    POST_SUBSCRIPTION = 1,
    USER_SUBSCRIPTION = 2,
}

export const profileImagePlaceholder = 'https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0';