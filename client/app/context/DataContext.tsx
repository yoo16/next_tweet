"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/app/models/User';

interface ContextProps {
    layoutData: string;
    setLayoutData: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<ContextProps>({
    layoutData: '',
    setLayoutData: () => { },
});

export const useLayoutData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [layoutData, setLayoutData] = useState('Data from Layout');

    console.log("DataProvider:", children)
    return (
        <DataContext.Provider value={{ layoutData, setLayoutData }}>
            {children}
        </DataContext.Provider>
    );
};