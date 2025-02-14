import { useState } from "react";
import config from '../server/fetchData';
import { ImportData } from './Home';
import Button from "../utils/Button";

function AddImage() {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const apiUrl = config.API_URL;

    ImportData(setImages);

    
    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);

        
        if (url) {
            setImagePreview(url);
        } else {
            setImagePreview('');
        }
    };

    
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("adding")
        
        

        const newImage = {
            title,
            url: imageUrl
        };

        try {
            const response = await fetch(`${apiUrl}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newImage)
            });

            if (response.ok) {
                const data = await response.json();

                const userConfirm = window.confirm(`Are you sure you want to add this image? \n\nTitle: ${data.title} \nUrl: ${data.url}`)
        if(!userConfirm){
            console.log("user didn't confirm the action")
            return;
        }
        else{
            console.log("user confirm the action")
        }

                setTitle('');
                setImageUrl('');
                setImagePreview('');
                setImages((prevImages) => [...prevImages, data]);
            } else {
                console.error('Failed to add new image');
            }
        } catch (error) {
            console.error('Error adding image', error);
        }
    }

    return (
        <div>
            <div>
                <h1>Adicionar Imagem</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="URL da Imagem"
                        value={imageUrl}
                        onChange={handleUrlChange}
                    />

                    {imagePreview && (
                        <div>
                            <h3>Preview:</h3>
                            <img src={imagePreview} alt="Preview"width='100'/>
                        </div>
                    )}

                    <button type="submit">
                        Adicionar
                    </button>
                </form>
            </div>
            <div>
                <h2>Lista</h2>
                {images.map((image) => (
                    <div key={image._id}>
                        <div>
                            <img src={image.url} alt="" width='500'/>
                            <h3>{image.title}</h3>
                        </div>
                        <div>
                            <Button />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddImage;

