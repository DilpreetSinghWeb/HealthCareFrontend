/* eslint-disable react/no-unescaped-entities */
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { HiStar } from "react-icons/hi";

import Testimonial01 from "../../assets/images/Testimonial_01.jpeg";
import Testimonial02 from "../../assets/images/Testimonial_02.avif";
import Testimonial03 from "../../assets/images/Testimonial_03.jpg";
import Testimonial04 from "../../assets/images/Testimonial_04.jpeg";
import Testimonial05 from "../../assets/images/Testimonial_05.jpg";

const testimonials = [
    {
        name: "Emily Watson",
        rating: 5,
        comment: "I have taken medical services from them. They treat so well, and they provide the best medical services.",
        image: Testimonial01,
    },
    {
        name: "James Anderson",
        rating: 4,
        comment: "Their service is excellent! The doctors are very professional and compassionate. I highly recommend them!",
        image: Testimonial02,
    },
    {
        name: "John Doe",
        rating: 5,
        comment: "Great experience! The staff was friendly, and the doctor was very thorough. I feel much better after my treatment.",
        image: Testimonial03,
    },
    {
        name: "Ayesha Khan",
        rating: 4,
        comment: "I was worried about my condition, but after my visit here, I'm confident I'll recover soon. Thank you!",
        image: Testimonial04,
    },
    {
        name: "James Smith",
        rating: 5,
        comment: "Quick and professional service. The team really cares about their patients. I will definitely come back if needed.",
        image: Testimonial05,
    }
];

const Testimonial = () => {
    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper modules={[Pagination]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }} breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 0 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }}>
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className='py-[30px] px-5 rounded-[13px]'>
                            <div className="flex items-center gap-[13px]">
                                <div className='w-16 h-16 rounded-full' >
                                <img className='w-full h-full object-cover overflow-hidden rounded-full' src={testimonial.image} alt={testimonial.name} />

                                </div>
                                <div>
                                    <h4 className="text-[18px] leading-[30px] font-semibold text-textColor">
                                        {testimonial.name}
                                    </h4>
                                    <div className="flex items-center gap-[2px]">
                                        {Array(5).fill().map((_, i) => (
                                            <HiStar
                                                key={i}
                                                className={i < testimonial.rating
                                                    ? 'text-yellowColor w-[18px] h-5'
                                                    : 'text-gray-400 w-[18px] h-5'}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                                "{testimonial.comment}"
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Testimonial;
