import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";
import moment from "moment";

const AllCards = () => {
	const { data, handleDelete, handleCardEdit } = useContext(CommonData);
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
							<p className="date-time">{moment(item.time).format("lll")}</p>
							<div className="actions">
								<span onClick={() => handleCardEdit(item._id)}>Edit</span>
								<span onClick={() => handleDelete(item._id)}>Delete</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default AllCards;
