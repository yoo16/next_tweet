'use client'

import React from "react";
import { User, initialUser } from "../models/User";

interface UserContextType {
    user: User | undefined;
    setUser: User | undefined;
}

const defaultValue: UserContextType = {
    user: undefined,
    setUser: undefined,
};

const UserContext = React.createContext<UserContextType>(defaultValue);

export default UserContext;