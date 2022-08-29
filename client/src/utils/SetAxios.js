import client from "./axios";

class SetAxios {
	constructor() {
		this.data = [];
		this.error = null;
	}

	checkAdmin = async (url) => {
		try {
			const response = await client.get(url);
			return response;
		} catch (err) {
			this.errorHandler(err);
		}
	};

	fetchData = async (url) => {
		try {
			const response = await client.get(url);
			this.data = response.data;
		} catch (err) {
			this.errorHandler(err);
		}
	};

	addData = async (url, body) => {
		try {
			const response = await client.post(url, body);
			this.data = [...this.data, response.data];
			return response;
		} catch (err) {
			this.errorHandler(err);
		}
	};

	updateData = async (url, body) => {
		try {
			const response = await client.put(url, body);
			return response;
		} catch (err) {
			this.errorHandler(err);
		}
	};

	deleteData = async (url) => {
		try {
			const response = await client.delete(url);
			return response;
		} catch (err) {
			this.errorHandler(err);
		}
	};

	errorHandler = (err) => {
		this.error = err;
	};

	auth = async (url, body) => {
		try {
			const response = await client.post(url, body, { withCredentials: true });
			return response;
		} catch (err) {
			this.errorHandler(err);
		}
	};

	getData = async () => {
		await this.fetchData("/api/card/get");
		return { data: this.data, error: this.error };
	};
}

export default SetAxios;
