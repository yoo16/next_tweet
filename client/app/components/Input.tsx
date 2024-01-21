"use client"
interface InputProps {
    type: string,
    value?: string,
    onChange?: (value: any) => void,
    placeholder?: string,
}

const className = `
                p-3 my-2
                border-2 
                border-gray-200 
                rounded w-full 
                focus:outline-none 
                focus:bg-white 
                focus:border-blue-500
                `;

const Input = ({ type, value, onChange, placeholder }: InputProps) => {
    return (
        <input
            type={type}
            value={value}
            className={className}
            placeholder={placeholder}
            onChange={(e) => { onChange && onChange(e.target.value); }}
        />
    );
}

export default Input;