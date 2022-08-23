import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";

const PaginationPage = () => {
	const { isLoggedIn } = useContext(CommonData);
	return (
		<div>
			<Navbar />
		</div>
	);
};

export default PaginationPage;
