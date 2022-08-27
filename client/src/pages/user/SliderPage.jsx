import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";
import { Navigation, Pagination, Autoplay, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./user.css";

const SliderPage = () => {
	const { isLoggedIn, data, error } = useContext(CommonData);
	return (
		<div>
			<Navbar />
			<div className="slider-div">
				<Swiper
					modules={[Navigation, Pagination, Autoplay, Lazy]}
					spaceBetween={20}
					slidesPerView={3}
					navigation
					autoplay
					lazy
					loop={true}
					pagination={{ clickable: true }}
				>
					{data.map((item) => (
						<SwiperSlide key={item._id}>
							<div className="single-card">
								<img src={item.img} alt="img" />
								<h3>{item.title}</h3>
								<p className="des">{item.des}</p>
								<p className="date-time">{item.time}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* <Swiper spaceBetween={50} slidesPerView={3}>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
			</Swiper> */}
		</div>
	);
};

export default SliderPage;
