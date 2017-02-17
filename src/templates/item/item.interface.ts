export interface ItemImageInterface {
    url: string;
    width: number;
    height: number;
}

export interface ItemUserInterface {
    id: number;
    full_name: string;
    profile_picture: string;
    username: string;
}

export interface ItemInterface {
    id: string;
    type: 'image' | 'video';
    caption: {
        id: number;
        created_time: number;
        from: ItemUserInterface;
        text: string;
    };
    created_time: number;
    images?: {
        low_resolution: ItemImageInterface;
        standard_resolution: ItemImageInterface;
        thumbnail: ItemImageInterface;
    };
    likes: {
        count: number;
    };
    link: string;
    user: ItemUserInterface;
}