import useDocumentTitle from "../../hooks/useDocumentTitle";

function NotFoundPage() {
    useDocumentTitle('error')
    return (
        <div className="page-container">
            <div className="error-container">
                <h2>404 Error</h2>
                <p>Whoops. This page could not be found on the server.</p>
            </div>
        </div>
    )
}

export default NotFoundPage;
