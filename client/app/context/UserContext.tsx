'use client'

import React from "react";
import { User, initialUser } from "../models/User";

export interface UserContextType {
    user: User;
    setUser: (newUser: User) => void;
}

const defaultValue: UserContextType = {
    user: initialUser,
    setUser: () => {},
};

const UserContext = React.createContext<UserContextType>(defaultValue);

export default UserContext;