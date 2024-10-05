import { apiKey } from "../keys"; // Assuming you store the API key in keys.js or keys.ts

// Fetch Access Token using the API Key
const fetchAccessToken = async (apiKey: string) => {
	const tokenUrl = "https://iam.cloud.ibm.com/identity/token";
	const headers = {
		"Content-Type": "application/x-www-form-urlencoded",
	};
	console.log("Headers", headers);
	const body = `apikey=${encodeURIComponent(apiKey)}&grant_type=urn:ibm:params:oauth:grant-type:apikey`;
	console.log("Body", body);

	const response = await fetch(tokenUrl, {
		method: "POST",
		headers,
		body,
	});

	if (!response.ok) {
		throw new Error("Failed to fetch access token");
	}

	const data = await response.json();
	console.log("Data", data);
	return data.access_token;
};

// Function to generate text using the fetched access token
export const generateText = async (input: string) => {
	try {
		console.log("Fetching access token...");
		const accessToken = await fetchAccessToken(apiKey).catch((err) => {
			throw new Error(`Failed to fetch access token: ${err.message}`);
		});

		const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
		const headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		};

		const body = {
			input,
			parameters: {
				decoding_method: "greedy",
				max_new_tokens: 80,
				min_new_tokens: 0,
				stop_sequences: [],
				repetition_penalty: 1,
			},
			model_id: "meta-llama/llama-3-8b-instruct",
			project_id: "84df1d5b-973b-4e70-ba98-411dec5f5d25",
			moderations: {
				hap: {
					input: {
						enabled: true,
						threshold: 0.5,
						mask: {
							remove_entity_value: true,
						},
					},
					output: {
						enabled: true,
						threshold: 0.5,
						mask: {
							remove_entity_value: true,
						},
					},
				},
			},
		};
		console.log("Body", body);

		// Send request to IBM Cloud API
		const response = await fetch(url, {
			headers,
			method: "POST",
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error("Failed to generate text. Non-200 response.");
		}

		const data = await response.json();
		console.log("Generated text", data);
		return data.results[0].generated_text; 
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(`Error generating text: ${err.message}`);
		} else {
			throw new Error("Error generating text: Unknown error");
		}
	}
};
