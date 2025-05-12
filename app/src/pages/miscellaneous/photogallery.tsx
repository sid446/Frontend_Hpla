import React, { useEffect, useState } from 'react';
import { Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react';

// Define type for a single image item
interface ImageItem {
  image: string;
}

interface GallerySectionProps {
  title: string;
  images: ImageItem[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ title, images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openModal = (index: number) => {
    setSelectedImage(images[index].image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: number) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].image);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight' && selectedImage) navigateImage(1);
      if (e.key === 'ArrowLeft' && selectedImage) navigateImage(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-6 inline-block border-b-2 border-blue-500 pb-1">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((item, index) => (
          <div
            key={index}
            className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <button
              onClick={() => openModal(index)}
              className="w-full h-full focus:outline-none"
              aria-label={`View larger image ${index + 1}`}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <ImageIcon className="text-white w-12 h-12" />
              </div>
              <img
                src={item.image}
                alt={`Gallery item ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-6xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateImage(-1)}
                className="text-white hover:text-gray-300 focus:outline-none p-4 transform transition-transform hover:scale-110"
                aria-label="Previous image"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="relative max-h-[80vh] flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className="max-h-[80vh] max-w-full object-contain rounded-lg"
                />
              </div>

              <button
                onClick={() => navigateImage(1)}
                className="text-white hover:text-gray-300 focus:outline-none p-4 transform transition-transform hover:scale-110"
                aria-label="Next image"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-center text-white mt-4">
              <span>{currentIndex + 1} / {images.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://hpla.in/api/gallery/get-photo');
        const data = await response.json();

        if (data?.data) {
          const mapped: ImageItem[] = data.data.map((item: any) => ({
            image: item?.photo?.url,
          }));
          setPhotos(mapped);
        } else {
          throw new Error("No photo data found.");
        }
      } catch (err) {
        setError('Failed to fetch photos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-red-500">
            <AlertCircle className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium">{error}</p>
            <p className="text-gray-500 mt-2">Please try again later</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <ImageIcon className="w-12 h-12 mb-4" />
            <p className="text-lg">No photos available</p>
          </div>
        ) : (
          <GallerySection title="Photo Gallery" images={photos} />
        )}
      </div>
    </main>
  );
};

export default PhotoGallery;
