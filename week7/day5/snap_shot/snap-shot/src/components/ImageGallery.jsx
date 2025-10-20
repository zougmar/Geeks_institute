import ImageCard from "./ImageCard";

export default function ImageGallery({ photos }) {
  if (!photos || photos.length === 0)
    return <p className="text-center mt-10 text-gray-500">No images found.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
      {photos.map((photo) => (
        <ImageCard key={photo.id} src={photo.src.medium} alt={photo.alt} />
      ))}
    </div>
  );
}
