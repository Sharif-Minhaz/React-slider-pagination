import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const initialValue = {
	img: "",
	title: "",
	des: "",
};

const UpdateCardPage = () => {
	const location = useLocation();
	const params = useParams();
	const navigate = useNavigate();

	const { handleUpdateCardSubmit, error, setError } = useContext(CommonData);
	const [updatedCard, setUpdatedCard] = useState(initialValue);

	useEffect(() => {
		setUpdatedCard({
			img: location.state?.img,
			title: location.state?.title,
			des: location.state?.des,
		});
		setError({ ...error, ...initialValue });
	}, [location.state?.img, location.state?.title, location.state?.des]);

	const handleCardChange = (e) => {
		setUpdatedCard({ ...updatedCard, [e.target.name]: e.target.value });
	};
	const handleUpdateSubmit = (e) => {
		e.preventDefault();
		handleUpdateCardSubmit(params.id, updatedCard);
	};

	return (
		<>
			<Navbar />
			<div className="p-x">
				<form className="add-card-form update" onSubmit={handleUpdateSubmit}>
					<h1>Update card</h1>
					{updatedCard.img && (
						<img className="edit-img" src={updatedCard.img} alt="cardImage" />
					)}
					<input
						className={error?.img ? "is-invalid" : ""}
						onChange={handleCardChange}
						type="text"
						name="img"
						placeholder="Enter img url"
						// required
						value={updatedCard.img}
					/>
					{error?.img && <small className="invalid-feedback">{error?.img}</small>}
					<input
						className={error?.title ? "is-invalid" : ""}
						onChange={handleCardChange}
						type="text"
						name="title"
						placeholder="Enter card title"
						// required
						value={updatedCard.title}
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
						value={updatedCard.des}
					></textarea>
					{error?.des && <small className="invalid-feedback">{error?.des}</small>}
					<div className="update-btns">
						<button
							type="button"
							className="cancel-btn"
							onClick={() => navigate("/admin/all")}
						>
							CANCEL
						</button>
						<button type="submit">UPDATE</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default UpdateCardPage;
