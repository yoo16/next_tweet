'use client'

import React from "react";
import { User, initialUser } from "../models/User";

interface UserContextType {
    user: any;
    setUser: any;
}

const defaultValue: UserContextType = {
    user: initialUser,
    setUser: initialUser,
};

const UserContext = React.createContext<UserContextType>(defaultValue);

export default UserContext;