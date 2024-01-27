import { BeatLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className="flex justify-center items-center">
            <BeatLoader size={15} margin={5} color="#03100d" />
        </div>
    )
}

export default Loading;