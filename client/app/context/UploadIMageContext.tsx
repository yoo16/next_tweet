"use client"

import React, { createContext, useContext, useState } from "react";

export interface UploadImageContextType {
    createObjectURL: string;
    setCreateObjectURL: (value: string) => void;
    uploadImage: File | undefined;
    setUploadImage: (value: File) => void;
}

const defaultValue: UploadImageContextType = {
    createObjectURL: "",
    setCreateObjectURL: () => { },
    uploadImage: undefined,
    setUploadImage: () => {}
};

const UploadImageContext = React.createContext<UploadImageContextType>(defaultValue);

export default UploadImageContext;