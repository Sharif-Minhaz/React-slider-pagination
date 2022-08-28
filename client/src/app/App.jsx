import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SetAxios from "../utils/SetAxios";
import AllRoutes from "../routes/AllRoutes";
import { CommonData } from "../contexts/CommonData";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const handleReq = new SetAxios();
const initCardValue = {
	img: "",
	title: "",
	des: "",
};

const App = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState({});

	const [admin, setAdmin] = useState({
		username: "",
		password: "",
	});

	const [card, setCard] = useState(initCardValue);

	const errorHandler = (err) => {
		console.error(err);
		setError({ ...error, sysError: err });
		setIsLoading(false);
	};

	useEffect(() => {
		Promise.all([handleReq.checkAdmin("/admin/auth/check"), handleReq.getData()])
			.then((response) => {
				setIsLoggedIn(response?.[0]?.data?.isAdmin);

				setIsLoggedIn(true); //TODO: must be removed later

				setData(response?.[1]?.data);
			})
			.catch((err) => errorHandler(err))
			.finally(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnChange = (e) => {
		setAdmin({ ...admin, [e.target.name]: e.target.value });
	};

	const handleCardChange = (e) => {
		setCard({ ...card, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await handleReq.auth("/admin/auth/login", admin);
			if (response?.data?.isAdmin) {
				setIsLoggedIn(response.data.isAdmin);
				navigate("/admin/all");
				toast.success("Login successful");
				setAdmin({ username: "", password: "" });
				setError({ ...error, username: "", password: "", loginError: false });
			} else {
				setError({ ...error, ...response.data?.error });
				response.data?.msg === "failed" &&
					setError({ ...error, password: "", loginError: true });
				response.data?.msg !== "invalid" && toast.error("Invalid credentials!");
				setAdmin({ ...admin, password: "" });
			}
		} catch (err) {
			errorHandler(err);
		}
	};

	const handleDelete = async (id) => {
		try {
			const deletion = await handleReq.deleteData(`/admin/card/del/${id}`);
			if (deletion?.data) {
				const response = await handleReq.getData();
				setData(response.data);
				return toast.success("Card deleted successfully");
			}
			toast.error("Not authorized for this action");
		} catch (err) {
			errorHandler(err);
		}
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		navigate("/", { replace: true });
		toast.success("Logout Successful");
	};

	const handleCardSubmit = (e) => {
		e.preventDefault();
		handleReq
			.addData("/admin/card/add", card)
			.then((response) => {
				if (response?.data?.msg === "invalid") {
					return setError({ ...error, ...response?.data?.error });
				} else if (response?.data?.msg === "unauthorized") {
					return toast.error("Not authorized for this action");
				}
				setError({ ...error, ...initCardValue });
				reFetchData();
				setCard(initCardValue);
				toast.success("New card added successfully");
			})
			.catch((err) => errorHandler(err));
	};

	const handleUpdateCardSubmit = (id, body) => {
		handleReq
			.updateData(`/admin/card/update/${id}`, body)
			.then((response) => {
				if (response?.data?.msg === "success") {
					reFetchData();
					toast.success("Card updated successfully");
					return setError({ ...error, ...initCardValue });
				} else if (response?.data?.msg === "invalid") {
					return setError({ ...error, ...response.data?.error });
				}

				toast.error("Not authorized for this action");
			})
			.catch((err) => errorHandler(err));
	};

	const reFetchData = () => {
		handleReq
			.getData()
			.then((response) => {
				setData(response.data);
			})
			.catch((err) => errorHandler(err));
	};

	return (
		<CommonData.Provider
			value={{
				card,
				data,
				error,
				admin,
				isLoggedIn,
				setError,
				setIsLoggedIn,
				handleDelete,
				handleLogout,
				handleOnChange,
				handleSubmit,
				handleCardChange,
				handleCardSubmit,
				handleUpdateCardSubmit,
			}}
		>
			{isLoading ? <Loading /> : <AllRoutes />}
			<ToastContainer autoClose={4000} />
		</CommonData.Provider>
	);
};

export default App;
