import { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { CommonData } from "../../contexts/CommonData";
import ReactPaginate from "react-paginate";
import Items from "./Items";

const PaginationPage = ({ itemsPerPage }) => {
	const { data } = useContext(CommonData);
	const items = data;

	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);

	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(items.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(items.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, items]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);

		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};

	return (
		<>
			<Navbar />
			<Items currentItems={currentItems} />
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
				className="pagination-style"
			/>
		</>
	);
};

export default PaginationPage;
