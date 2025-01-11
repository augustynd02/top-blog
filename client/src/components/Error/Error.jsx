import styles from './error.module.css'
import { useState, useRef } from 'react';
import { MdClose } from "react-icons/md";

function Error({ message }) {
    const errorRef = useRef(null);
    const [isDisplayed, setIsDisplayed] = useState(true);

    const hidePopup = () => {
        errorRef.current.classList.add(styles.disappear);
        setTimeout(() => {
            setIsDisplayed(false);
        }, 500)
    }
    return (
        <>
            { isDisplayed && (
                <div ref={errorRef} className={styles.errorContainer}>
                    <MdClose onClick={hidePopup} className={styles.closeIcon} />
                    <p>{message}</p>
                </div>
            )}
        </>
    )
}

export default Error;
