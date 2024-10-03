import React, { useState } from "react";

const TextGenerationComponent = () => {
	const [output, setOutput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [apiKey] = useState("YOUR_API_KEY"); // Replace with your actual API key

	const fetchAccessToken = async () => {
		const tokenUrl = "https://iam.cloud.ibm.com/identity/token";
		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
		};
		const body = new URLSearchParams({
			apikey: apiKey,
			grant_type: "urn:ibm:params:oauth:grant-type:apikey",
		});

		const response = await fetch(tokenUrl, {
			method: "POST",
			headers,
			body,
		});

		if (!response.ok) {
			throw new Error("Failed to fetch access token");
		}

		const data = await response.json();
		return data.access_token;
	};

	const generateText = async () => {
		setLoading(true);
		setError(null); // Reset error state

		try {
			const accessToken = await fetchAccessToken(); // Get access token

			const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
			const headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`, // Use the fetched access token
			};
			const body = {
				input: "Input: Crop: Lemons\n\nIdeal conditions:\n\nQ1: {10-15°C, 1005-1015 hPa, 60-100 mm rain, 50-70% humidity}\nQ2: {15-25°C, 1008-1018 hPa, 80-120 mm rain, 55-75% humidity}\nQ3: {20-30°C, 1010-1020 hPa, 30-60 mm rain, 40-60% humidity}\nQ4: {5-10°C, 1000-1010 hPa, 40-80 mm rain, 50-65% humidity}\nLocation conditions:\n\nQ1: {12°C, 1010 hPa, 80 mm rain, 65% humidity}\nQ2: {18°C, 1015 hPa, 100 mm rain, 70% humidity}\nQ3: {25°C, 1007 hPa, 40 mm rain, 50% humidity}\nQ4: {8°C, 1003 hPa, 70 mm rain, 55% humidity}\nOutput:Your 1st and 4th quarters are favorable for walnuts. However, the 2nd quarter's excess rain may cause root issues, and the dry 3rd quarter could stress the trees. Managing drainage and irrigation is key for optimal growth.",
				parameters: {
					decoding_method: "greedy",
					max_new_tokens: 80,
					min_new_tokens: 0,
					stop_sequences: [],
					repetition_penalty: 1,
				},
				model_id: "ibm/granite-13b-chat-v2",
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
			console.log("Wouldave scored model with: ", body);
			// const response = await fetch(url, {
			// 	headers,
			// 	method: "POST",
			// 	body: JSON.stringify(body),
			// });

			if (!response.ok) {
				throw new Error("Non-200 response");
			}

			const data = await response.json();
			setOutput(data.output); // Assuming the output is stored in the 'output' field
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<button onClick={generateText} disabled={loading}>
				{loading ? "Generating..." : "Generate Text"}
			</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<div>
				<h3>Output:</h3>
				<p>{output}</p>
			</div>
		</div>
	);
};

export default TextGenerationComponent;
