export default function ImageCard({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
      <img src={src} alt={alt} className="w-full h-48 object-cover" />
    </div>
  );
}
