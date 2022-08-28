import Loader from "../assets/gifs/loading.webp";

const Loading = () => {
	return (
		<div className="loading-page">
			<img src={Loader} alt="loading, please wait..." />
		</div>
	);
};

export default Loading;
