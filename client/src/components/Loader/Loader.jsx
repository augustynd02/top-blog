import { AiOutlineLoading } from "react-icons/ai";
import styles from './loader.module.css';

function Loader({ message = "Loading" }) {
    return (
        <div className={styles.loaderContainer}>
            <AiOutlineLoading className={styles.loader} />
            <p>{message}</p>
        </div>
    )
}

export default Loader;
