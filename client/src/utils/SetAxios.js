import client from "./axios";

class SetAxios {
	constructor() {
		this.data = [];
		this.error = null;
	}

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
		} catch (err) {
			this.errorHandler(err);
		}
	};

	updateData = async (url, body) => {
		try {
			await client.put(url, body);
		} catch (err) {
			this.errorHandler(err);
		}
	};

	deleteData = async (url) => {
		try {
			await client.delete(url);
		} catch (err) {
			this.errorHandler(err);
		}
	};

	errorHandler = (err) => {
		this.error = err;
	};

	getData = async () => {
		await this.fetchData("/api/card/get");
		return { data: this.data, error: this.error };
	};
}

export default SetAxios;
