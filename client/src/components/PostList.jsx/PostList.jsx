import PostPreview from "../PostPreview/PostPreview";

function PostList({ switchToEdit }) {
    return (
        <div className="asd">
            <PostPreview cb={switchToEdit} />
        </div>
    )
}

export default PostList;
