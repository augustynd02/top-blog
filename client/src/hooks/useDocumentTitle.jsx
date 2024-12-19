import { useEffect } from 'react';

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = `aspdevs | ${title}`;
    }, [title])
}

export default useDocumentTitle;