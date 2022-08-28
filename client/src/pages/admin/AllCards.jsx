import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AllCards = () => {
	const navigate = useNavigate();
	const { data, handleDelete } = useContext(CommonData);

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
								<span
									onClick={() =>
										navigate(`/admin/update-card/${item._id}`, {
											state: item,
										})
									}
								>
									Edit
								</span>
								<span onClick={() => handleDelete(item._id)}>Delete</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default AllCards;
