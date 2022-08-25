import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const SliderPage = () => {
	const { isLoggedIn, data, error } = useContext(CommonData);
	return (
		<div>
			<Navbar />
			{data.map((item) => (
				<div className="single-card" key={item._id}>
					<p>{item.img}</p>
					<p>{item.title}</p>
					<p>{item.des}</p>
					<p>{item.time}</p>
				</div>
			))}
		</div>
	);
};

export default SliderPage;
