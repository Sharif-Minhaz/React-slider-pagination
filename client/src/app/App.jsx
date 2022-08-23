import { useState, useEffect } from "react";
import "./App.css";
import SetAxios from "../utils/SetAxios";
import AllRoutes from "../routes/AllRoutes";
import { CommonData } from "../contexts/CommonData";

const handleReq = new SetAxios();

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		handleReq
			.getData()
			.then((response) => {
				setData(response.data);
				setIsLoading(false);
			})
			.catch((error) => errorHandler(error));
	}, []);

	const handleDelete = async (id) => {
		try {
			await handleReq.deleteData(`/admin/card/del/${id}`);
			const response = await handleReq.getData();
			setData(response.data);
		} catch (error) {
			errorHandler(error);
		}
	};

	const errorHandler = (error) => {
		console.error(error);
		setError(error);
		setIsLoading(false);
	};

	return (
		<CommonData.Provider
			value={{
				data,
				error,
				isLoggedIn,
				setIsLoggedIn,
				handleDelete,
			}}
		>
			{isLoading ? "Loading please wait..." : <AllRoutes />}
		</CommonData.Provider>
	);
};

export default App;
