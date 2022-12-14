import { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const AddCardPage = () => {
	const { card, error, setError, handleCardChange, handleCardSubmit } = useContext(CommonData);

	useEffect(() => {
		setError({ ...error, img: "", title: "", des: "" });
	}, []);

	return (
		<>
			<Navbar />
			<div className="p-x">
				<form className="add-card-form" onSubmit={handleCardSubmit}>
					<h1>Add new card</h1>
					{card.img && <img src={card.img} alt="card-img" />}
					<input
						className={error?.img ? "is-invalid" : ""}
						onChange={handleCardChange}
						type="text"
						name="img"
						placeholder="Enter img url"
						// required
						value={card.img}
					/>
					{error?.img && <small className="invalid-feedback">{error?.img}</small>}
					<input
						className={error?.title ? "is-invalid" : ""}
						onChange={handleCardChange}
						type="text"
						name="title"
						placeholder="Enter card title"
						// required
						value={card.title}
					/>
					{error?.title && <small className="invalid-feedback">{error?.title}</small>}
					<textarea
						className={error?.des ? "is-invalid" : ""}
						name="des"
						cols="60"
						rows="6"
						placeholder="Enter card description"
						onChange={handleCardChange}
						// required
						value={card.des}
					></textarea>
					{error?.des && <small className="invalid-feedback">{error?.des}</small>}
					<button>ADD + </button>
				</form>
			</div>
		</>
	);
};

export default AddCardPage;
