import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../components/ImageGallery";

export default function CategoryPage() {
  const { type } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${type}&per_page=30`, {
        headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
      });
      setPhotos(res.data.photos);
    };
    fetchImages();
  }, [type]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mt-8">{type.charAt(0).toUpperCase() + type.slice(1)} Pictures</h2>
      <ImageGallery photos={photos} />
    </div>
  );
}
