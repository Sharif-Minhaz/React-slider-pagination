import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const AddCardPage = () => {
	const { handleCardChange, handleCardSubmit } = useContext(CommonData);
	return (
		<>
			<Navbar />
			<div className="add-card">
				<h3>Add new card</h3>
				<form onSubmit={handleCardSubmit}>
					<input
						onChange={handleCardChange}
						type="text"
						name="cardImg"
						placeholder="Enter img url"
						required
					/>
					<input
						onChange={handleCardChange}
						type="text"
						name="cardTitle"
						placeholder="Enter card title"
						required
					/>
					<textarea
						name="cardDes"
						cols="60"
						rows="10"
						placeholder="Enter card description"
						onChange={handleCardChange}
						required
					></textarea>
					<input type="date" onChange={handleCardChange} name="cardDateTime" required />
					<button>ADD</button>
				</form>
			</div>
		</>
	);
};

export default AddCardPage;
