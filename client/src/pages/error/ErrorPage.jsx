import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Navbar />
			<div>
				<h1>404 page not found!</h1>
				<button onClick={() => navigate("/")}>Back to home</button>
			</div>
		</div>
	);
};

export default ErrorPage;
