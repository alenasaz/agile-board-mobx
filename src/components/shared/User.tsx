import { Avatar, Box } from "@mui/material";
import React from "react";

export interface IUser {
  id: string;
  name: string;
  createdAt: string;
  avatar: string;
}

const User: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar src={user?.avatar} alt={user?.name} />
      <span style={{ padding: 5 }}>{user?.name}</span>
    </Box>
  );
};

export default User;
