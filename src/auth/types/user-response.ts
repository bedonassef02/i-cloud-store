export type UserResponse = {
    user: {
        id: string;
        username: string;
        email: string;
    };
    token: string;
};
