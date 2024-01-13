import { FaExclamationCircle } from "react-icons/fa";

interface FormErrorProps {
    message: string
}

const FormError = ({ message }: FormErrorProps) => {
    if (!message) return;
    return (
        <div className='p-2 flex text-red-700 bg-red-100 rounded-lg'>
            <FaExclamationCircle className='mt-1 mx-2' />
            <div className="">{message}</div>
        </div>
    );
}

export default FormError;