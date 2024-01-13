interface InputProps {
    type: string,
    value: string,
    placeholder: string,
    event: any,
}

const Input = ({ type, value, placeholder, event }: InputProps) => {

    return (
        <input
        type={type} 
        value={value}
        className='my-2 border-2 border-gray-200 rounded w-full p-3 
        focus:outline-none focus:bg-white focus:border-blue-500'
        placeholder={placeholder}
        onChange={(e) => { event(e.target.value); }}
    />
    );
}

export default Input;