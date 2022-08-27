const Items = ({ currentItems }) => {
	return (
		<div className="pagination-container">
			{currentItems &&
				currentItems.map((item) => (
					<div key={item._id} className="single-card">
						<img src={item.img} alt="img" />
						<h3>{item.title}</h3>
						<p className="des">{item.des}</p>
						<p className="date-time">{item.time}</p>
					</div>
				))}
		</div>
	);
};

export default Items;