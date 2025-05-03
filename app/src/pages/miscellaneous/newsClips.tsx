const NewsClippings = [
    { image: `${process.env.PUBLIC_URL}/news_clips/3.jpg` },
    { image: `${process.env.PUBLIC_URL}/news_clips/4.jpg` },
    { image: `${process.env.PUBLIC_URL}/news_clips/5.jpg` },
    { image: `${process.env.PUBLIC_URL}/news_clips/6.jpg` },
    { image: `${process.env.PUBLIC_URL}/news_clips/7.jpg` },
  ];
  
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
          <dialog id={`my_modal_${index}`} className="modal p-4 rounded">
          <div className="modal-box">
          <img  src={item.image} alt={`item-${index}`} />
            <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">✕</button>
                  </form>
            </div>
          </div>
            </dialog>
          </>
        ))}
      </div>
    </div>
  );
  
  function newsClips() {
    return (
      <main className="m-3">
        <GallerySection title="News Clippings" images={NewsClippings} />
      </main>
    );
  }
  
  
  export default newsClips;
  