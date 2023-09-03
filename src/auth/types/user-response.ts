export type UserResponse = {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  token: string;
};
