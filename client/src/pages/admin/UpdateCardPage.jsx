import { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const initialValue = {
	img: "",
	title: "",
	des: "",
};

const UpdateCardPage = () => {
	const { handleUpdateCardSubmit } = useContext(CommonData);
	const [updatedCard, setUpdatedCard] = useState(initialValue);
	const handleCardChange = (e) => {
		setUpdatedCard({ ...updatedCard, [e.target.name]: e.target.value });
	};
	const handleUpdateSubmit = () => {
		handleUpdateCardSubmit();
		setUpdatedCard(initialValue);
	};

	return (
		<>
			<Navbar />
			<div className="p-x">
				<form className="add-card-form" onSubmit={handleUpdateSubmit}>
					<h1>Update card</h1>
					<input
						onChange={handleCardChange}
						type="text"
						name="img"
						placeholder="Enter img url"
						required
						value={updatedCard.img}
					/>
					<input
						onChange={handleCardChange}
						type="text"
						name="cardTitle"
						placeholder="Enter card title"
						required
						value={updatedCard.title}
					/>
					<textarea
						name="cardDes"
						cols="60"
						rows="10"
						placeholder="Enter card description"
						onChange={handleCardChange}
						required
						value={updatedCard.des}
					></textarea>
					<button>UPDATE</button>
				</form>
			</div>
		</>
	);
};

export default UpdateCardPage;
