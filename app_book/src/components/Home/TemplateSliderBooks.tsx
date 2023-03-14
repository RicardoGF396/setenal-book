// Import Swiper styles
import "swiper/css";
// Import Swiper React components
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import SingleBookItem from "../SingleBookItem";
import { RecentBook } from "../../interfaces/RecentBook";
import clienteAxios from "../../config/config";

function TemplateSliderBooks({
  endpoint,
  title,
  param,
}: {
  endpoint: string;
  title: string;
  param?: string;
}) {
  const [recentBooks, setRecentBooks] = useState<RecentBook[]>([]);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        if (param == undefined) {
          const res = await clienteAxios.get(`/${endpoint}`);
          setRecentBooks(res.data);
        }else{
          const res = await clienteAxios.get(`/${endpoint}/${param}`);
          setRecentBooks(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecentBooks();
  }, []);

  return (
    <div className="mt-8 mb-20">
      <h3 className="text-xl font-lora mb-8 px-6 lg:pl-20"> {title} </h3>

      <div className="w-[100vw]">
        <Swiper
          loop={true}
          grabCursor={true}
          slidesPerView={1.8}
          centeredSlides={true}
          spaceBetween={10}
          breakpoints={{
            768: {
              spaceBetween: 30,
              slidesPerView: 2.3,
            },
            1024: {
              loopedSlides: 3,
              centeredSlides: true,
              slidesPerView: 6,
            },
          }}
        >
          {recentBooks.map((book) => (
            <SwiperSlide>
              <SingleBookItem book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TemplateSliderBooks;
