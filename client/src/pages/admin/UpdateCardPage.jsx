import { useContext } from "react";
import { CommonData } from "../../contexts/CommonData";

const UpdateCardPage = () => {
	const { isLoggedIn } = useContext(CommonData);
	return <div>UpdateCardPage</div>;
};

export default UpdateCardPage;
