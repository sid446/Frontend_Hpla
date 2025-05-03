import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  const newsRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const newsContainer = newsRef.current;

    const handleScroll = () => {
      if (newsContainer && !isHovered) {
        newsContainer.scrollTop += 2;

        if (newsContainer.scrollTop + newsContainer.clientHeight >= newsContainer.scrollHeight) {
          newsContainer.scrollTop = 0;
        }
      }
    };

    const intervalId = setInterval(handleScroll, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, [isHovered]);

  const newsItems = [
    {
      title: 'HPLA has registered as non-profit association under the H.P. Societies Registration Act 2006 (Act No. 25 of 2006) bearing Registration No. 1366/2019.',
      content: 'The HPLA member registration is open now. Please be a member of HPLA by submitting Membership registration form along with requisite fee.  Membership fee receipt along with membership no. shall soon be provided.',
      slug: '/Constitution',
    },
    {
      title: 'HPLA Election 19 May 2024',
      content: 'Members are hereby notified regarding the Governing Body Election.',
      slug: 'https://drive.google.com/file/d/1lsm4amk0CFSOsFhvJWd2bs2Lm3JPNRp-/view?usp=sharing'
    },
    // {
    //   title: 'News 3',
    //   content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //   slug: 'https://drive.google.com/file/d/1lsm4amk0CFSOsFhvJWd2bs2Lm3JPNRp-/view?usp=sharing'
    // },
    // {
    //   title: 'News 4',
    //   content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //   slug: 'https://drive.google.com/file/d/1lsm4amk0CFSOsFhvJWd2bs2Lm3JPNRp-/view?usp=sharing'
    // },
    // {
    //   title: 'News 5',
    //   content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //   slug: 'https://drive.google.com/file/d/1lsm4amk0CFSOsFhvJWd2bs2Lm3JPNRp-/view?usp=sharing'
    // },
    // {
    //   title: 'News 6',
    //   content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //   slug: 'https://drive.google.com/file/d/1lsm4amk0CFSOsFhvJWd2bs2Lm3JPNRp-/view?usp=sharing'
    // },
  ];

  return (
    <>
      <div className='py-5'>
        <h1 className="text-3xl">Notice Board</h1>
        <hr className='my-5' />
      </div>
    <div
      ref={newsRef}
      className="min-w-full bg-gray-200 p-3 rounded-md flex flex-col overflow-auto min-h-screen mb-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {newsItems.map((news, index) => (
        <div key={index} className="mx-2 mb-2 p-2 bg-white border rounded-md">
          <p className="text-sm font-medium text-gray-700">{news.title}</p>
          <hr />
          <Link to={news.slug} className="text-xs text-blue-600">{news.content}</Link>
        </div>
      ))}
      </div>
      </>
  );
};

export default LatestNews;
