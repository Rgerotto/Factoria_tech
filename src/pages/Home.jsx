import { useEffect, useState } from 'react';
import config from '../server/fetchData';  // Import config.js
import { Link } from 'react-router-dom';

export function ImportData(setImages){
  const apiUrl = config.API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/images`);
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [apiUrl, setImages]);
}

const Home = () => {
  const [images, setImages] = useState([]);
  ImportData(setImages);

  return (
    <div>
      <h1>Home Page</h1>
      <Link to='/add'>add new image</Link>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <h3>{image.title}</h3>
            <img src={image.url} alt={image.title} width='700'/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
