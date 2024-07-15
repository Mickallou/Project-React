import './Loader.css'
import { ThreeDot } from 'react-loading-indicators'

export default function Loader() {
    return (
        <div className="loader">
            <ThreeDot color="white" size={200} />
        </div>
    )
}
