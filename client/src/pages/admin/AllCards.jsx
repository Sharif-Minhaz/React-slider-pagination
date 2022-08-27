import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const AllCards = () => {
	const { data, error, handleDelete } = useContext(CommonData);
	return (
		<div>
			<Navbar />
			<div className="pagination-container">
				{data &&
					data.map((item) => (
						<div key={item._id} className="single-card">
							<img src={item.img} alt="img" />
							<h3>{item.title}</h3>
							<p className="des">{item.des}</p>
							<p className="date-time">{item.time}</p>
							<div className="actions">
								<span>Edit</span>
								<span>Delete</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default AllCards;
