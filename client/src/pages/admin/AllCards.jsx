import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AllCards = () => {
	const navigate = useNavigate();
	const { data, handleDelete } = useContext(CommonData);
	const [cardData, setCardData] = useState([]);
	const [endOffSet, setEndOffSet] = useState(5);

	useEffect(() => {
		setCardData(data.slice(0, endOffSet));
	}, [data, endOffSet]);

	const handleLoadMore = () => {
		if (data.length - endOffSet >= 5) {
			return setEndOffSet((prev) => prev + 5);
		} else if (data.length - endOffSet > 0) {
			return setEndOffSet((prev) => prev + (data.length - endOffSet));
		}
	};

	return (
		<>
			<Navbar />
			<div className="pagination-container">
				{cardData &&
					cardData.map((item) => (
						<div key={item._id} className="single-card">
							<img src={item.img} alt="itemImg" />
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
			{data.length - endOffSet > 0 && (
				<div className="load-more-div">
					<button onClick={handleLoadMore}>Load more ⇲</button>
				</div>
			)}
		</>
	);
};

export default AllCards;
