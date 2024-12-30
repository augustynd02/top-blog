import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '../Tag/Tag'
import styles from './posteditor.module.css';
import { MdAdd } from "react-icons/md";

function PostEditor({ currentPost }) {
    const [formData, setFormData] = useState({title: currentPost.title, content: currentPost.content});
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([...currentPost.tags]);
    const [error, setError] = useState(null);
    const selectRef = useRef(null);
    const newTagRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts/tags', {
                    method: 'GET',
                    credentials: 'include',
                })

                const data = await response.json();

                if (response.ok) {
                    setTags(data)
                } else {
                    setError('Error fetching tags: ', data.message);
                }
            }
            catch (err) {
                setError('Error: ' + err)
            }
        }
        getTags()
    }, [])

    const handleAddingTag = () => {
        const value = selectRef.current.value;
        const tag = tags.find(tag => tag.id == value);
        if (!selectedTags.includes(tag)) {
            console.log(selectedTags);
            setSelectedTags([...selectedTags, tag])
        }
    }

    const handleNewTag = () => {
        const value = newTagRef.current.value.trim();
        const existingTagNames = tags.map(tag => tag.name);
        if (!existingTagNames.includes(value)) {
            /*
                Set the ID to the value of the tag, since id in this object is needed for key prop in React
                Prisma will later check if name exists in the tag table, and if not: insert it with a new ID
            */
           const newTag = { id: value, name: value };
           setTags([...tags, newTag]);
           setSelectedTags([...selectedTags, newTag]);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create an object with just tag names to connect the post with the tags in Prisma
            const tagNames = selectedTags.map(tag => ({ name: tag.name }));
            console.log(JSON.stringify({ ...formData, tags: tagNames }));
            const response = await fetch(`http://localhost:3000/api/posts/${currentPost.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ ...formData, tags: tagNames })
            })

            const data = await response.json();

            if (response.ok) {
                navigate('/admin')
            } else {
                setError(data.message || 'Unknown error.');
            }
        } catch (err) {
            setError('Unknown error: ' + err);
        }
    }

    return (
        <div className={styles.editorContainer}>
            <h2>Edit a blog post</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formField}>
                    <label htmlFor="title">Post title</label>
                    <input required type="text" name="title" id="title" value={formData.title} onChange={handleChange}/>
                </div>

                <div className={styles.formField}>
                    <div className={styles.tagAdder}>
                        <div>
                            <label htmlFor="tags">Add tags</label>
                            <div className={styles.tagSection}>
                                <select ref={selectRef} name="tags" id="tags">
                                    {tags.map(tag => {
                                        return <option key={tag.id} value={tag.id}>{tag.name}</option>
                                    })}
                                </select>
                                <button type="button" onClick={handleAddingTag}>
                                    <MdAdd />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="newTag">Tag not on the list? Add it: </label>
                            <div className={styles.tagSection}>
                                <input type="text" name="newTag" id="newTag" ref={newTagRef} />
                                <button type="button" onClick={handleNewTag}>
                                    <MdAdd />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        {selectedTags.length > 0 ? selectedTags.map(tag => <Tag key={tag.id} type='category'>{tag.name}</Tag>) : <span>No tags added...</span>}
                    </div>
                </div>

                <div className={styles.formField}>
                    <label htmlFor="content">Post content</label>
                    <textarea required name="content" id="content" value={formData.content} onChange={handleChange} ></textarea>
                </div>

                <button type="submit">Edit</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default PostEditor;
