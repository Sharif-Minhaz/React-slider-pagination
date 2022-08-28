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

	const [card, setCard] = useState({
		cardImg: "",
		cardTitle: "",
		cardDes: "",
		cardDateTime: "",
	});

	useEffect(() => {
		Promise.all([handleReq.checkAdmin("/admin/auth/check"), handleReq.getData()])
			.then((response) => {
				setIsLoggedIn(response?.[0]?.data?.isAdmin);
				// setIsLoggedIn(true);
				setData(response?.[1]?.data);
			})
			.catch((err) => errorHandler(err))
			.finally(() => setIsLoading(false));
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
				toast.success(response.data.msg);
				setAdmin({ username: "", password: "" });
				setError({ ...error, username: "", password: "", loginError: false });
			} else {
				setError(response.data?.error);
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
			await handleReq.deleteData(`/admin/card/del/${id}`);
			const response = await handleReq.getData();
			setData(response.data);
		} catch (err) {
			errorHandler(err);
		}
	};

	const errorHandler = (err) => {
		console.error(err);
		setError({ ...error, sysError: err });
		setIsLoading(false);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		navigate("/", { replace: true });
		toast.success("Logout Successful");
	};

	const handleCardSubmit = (e) => {
		console.log(card);
		e.preventDefault();
		handleReq
			.addData("/admin/card/add", card)
			.then((response) => {
				setData([...data, response?.data]);
			})
			.catch((err) => errorHandler(err));
	};

	return (
		<CommonData.Provider
			value={{
				data,
				error,
				admin,
				isLoggedIn,
				setIsLoggedIn,
				handleDelete,
				handleLogout,
				handleOnChange,
				handleSubmit,
				handleCardChange,
				handleCardSubmit,
			}}
		>
			{isLoading ? <Loading /> : <AllRoutes />}
			<ToastContainer autoClose={4000} />
		</CommonData.Provider>
	);
};

export default App;
