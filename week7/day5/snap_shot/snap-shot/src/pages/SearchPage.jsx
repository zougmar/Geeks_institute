import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../components/ImageGallery";

export default function SearchPage() {
  const { query } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=30`, {
        
        headers: { Authorization: process.env.VITE_PEXELS_API_KEY},
      });
      setPhotos(res.data.photos);
    };
    fetchImages();
  }, [query]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mt-8">Results for “{query}”</h2>
      <ImageGallery photos={photos} />
    </div>
  );
}
