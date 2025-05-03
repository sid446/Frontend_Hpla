const GallerySection = ({ title, images }: { title: string, images: { image: string }[] }) => (
  <div className="mb-6">
    <h2 className="text-3xl mb-3">
      <span className="border-b border-gray-300">{title}</span>
    </h2>
    <div className="flex flex-wrap">
      {images.map((item, index) => (
        <>
        <button onClick={() => (document.getElementById(`my_modal_${index}`) as HTMLDialogElement).showModal()} key={index} className="p-3">
          <img style={{ maxBlockSize: "15rem", objectFit: 'cover' }} src={item.image} alt={`item-${index}`} />
        </button>
        <dialog id={`my_modal_${index}`} className="modal p-4 rounded h-screen">
        <div className="modal-box">
        <img  src={item.image} alt={`item-${index}`} className="w-screen h-full" />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">✕</button>
            </form>
          </div>
        </div>
          </dialog>
        </>
      ))}
    </div>
  </div>
);

const Photos = [
  { image: `${process.env.PUBLIC_URL}/gallery/1.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/2.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/3.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/4.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/5.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/6.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/7.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/8.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/10.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/11.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/12.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/13.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/14.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/15.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/16.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/17.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/18.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/19.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/20.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/21.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/22.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/23.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/24.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/25.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/26.webp` },
  { image: `${process.env.PUBLIC_URL}/gallery/27.webp` },
];

const PhotoGallery: React.FC = () => {
  return (
    <main className="m-3">
      <GallerySection title="Photo Gallery" images={Photos} />
    </main>
  );
}

export default PhotoGallery;