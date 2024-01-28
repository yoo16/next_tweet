import { FaExclamationCircle } from "react-icons/fa";

interface ErrorMessageProps {
    message: string
}

const FormError = ({ message }: ErrorMessageProps) => {
    if (!message) return;
    return (
        <div className='my-2 p-2 flex text-red-700 bg-red-100 rounded-lg'>
            <FaExclamationCircle className='mt-1 mx-2' />
            <div>{message}</div>
        </div>
    );
}

export default FormError;