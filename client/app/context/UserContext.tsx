'use client'

import React from "react";
import { User, initialUser } from "../models/User";

interface UserContextType {
    user: User;
}

const defaultValue: UserContextType = {
    user: initialUser,
};

const UserContext = React.createContext<UserContextType>(defaultValue);

export default UserContext;