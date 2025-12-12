
export interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bio?: string;
    birthday?: string; // ISO date string YYYY-MM-DD
    isFollowing?: boolean;
}

export interface Post {
    id: string;
    user: User;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    createdAt: string;
}

export const currentUser: User = {
    id: "u1",
    name: "Alex Doe",
    username: "@alexdoe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Birthday enthusiast! 🎂 | Streamer 🎥",
    birthday: "1995-08-15",
};

export const followers: User[] = [
    {
        id: "u2",
        name: "Sarah Smith",
        username: "@sarah_s",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        birthday: "1998-12-15", // Upcoming soon (example)
        isFollowing: true,
    },
    {
        id: "u3",
        name: "Mike Johnson",
        username: "@mikej",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        birthday: "1992-12-20", // Upcoming
        isFollowing: true,
    },
    {
        id: "u4",
        name: "Emily Davis",
        username: "@emilyd",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        birthday: "2000-01-05", // Next month
        isFollowing: true,
    },
    {
        id: "u5",
        name: "Chris Wilson",
        username: "@chrisw",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
        birthday: "1990-06-10",
        isFollowing: true,
    },
];

export const exploreItems: Post[] = [
    {
        id: "p1",
        user: followers[0], // Sarah
        content: "Just streamed my 25th birthday! Thanks for all the gifts! 🎁✨",
        image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=2600&auto=format&fit=crop",
        likes: 124,
        comments: 18,
        createdAt: "2023-12-10T14:00:00Z",
    },
    {
        id: "p2",
        user: followers[1], // Mike
        content: "Getting ready for the big bash next week! Who's tuning in? 🕺💃",
        likes: 89,
        comments: 12,
        createdAt: "2023-12-11T09:30:00Z",
    },
    {
        id: "p3",
        user: {
            id: "u6",
            name: "Jessica Lee",
            username: "@jessicalee",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
            isFollowing: false,
        },
        content: "Best birthday surprise ever! 🎈🎂",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2670&auto=format&fit=crop",
        likes: 456,
        comments: 42,
        createdAt: "2023-12-12T10:15:00Z",
    },
];
