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
	const { data } = useContext(CommonData);
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
					breakpoints={{
						499: {
							slidesPerView: 1,
						},
						640: {
							slidesPerView: 2,
						},
						768: {
							slidesPerView: 3,
						},
					}}
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
		</div>
	);
};

export default SliderPage;
