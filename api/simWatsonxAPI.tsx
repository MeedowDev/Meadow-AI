const cropWeights: { [key: string]: number } = {
	WHEAT: 0.1, // Lower weight for large-scale crops
	OATS: 0.1,
	RYE: 0.1,
	BARLEY: 0.1,
	MILLET: 0.3, // Slightly higher for some smaller scale options
	LEGUMES: 0.5,
	KIDNEY_BEANS: 0.6,
	LENTILS: 0.6,
	PEAS: 0.6,
	FABA_BEANS: 0.6,
	ALFALFA: 0.4,
	CORN: 0.2,
	SORGHUM: 0.2,
	SUNFLOWER: 0.4,
	HEMP: 0.5,
	FLAX: 0.5,
	KENAF: 0.5,
	JUTE: 0.5,
	CHICKPEAS: 0.5,
	SOYBEANS: 0.4,
	RICE: 0.2,
	COTTON: 0.3,
	HAY: 0.1,
	HAYLAGE: 0.1,
};
//!please consider variety. It is key
const related_crops: { [key: string]: string[] } = {
	WHEAT: ["WHEAT", "OATS", "RYE", "BARLEY", "MILLET"], //! wheat, Barley, Rye
	LEGUMES: ["KIDNEY BEANS", "LENTILS", "PEAS", "FABA BEANS", "ALFALFA"],
	CORN: ["CORN", "MILLET", "SORGHUM", "SUNFLOWER", "SWEET POTATO"], //! Sweet potatoe,sunflower
	HAYLAGE: ["HAYLAGE", "ALFALFA", "CLOVER", "RYEGRASS", "ORCHARDGRASS"], //! HayLage, Clover, Alfafa, Timonth
	HAY: ["HAY", "ALFALFA", "TIMOTHY HAY", "BERMUDA GRASS", "FESCUE"], //! Unsastainable
	BARLEY: ["BARLEY", "OATS", "RYE", "TRITICALE", "MILLET"], //! Not economically viable
	COTTON: ["COTTON", "SOYBEANS", "PEANUTS", "SUNFLOWER", "SESAME"], //! Cotton
	SORGHUM: ["SORGHUM", "MILLET", "MAIZE", "SUNFLOWER", "TEFF"],
	HEMP: ["HEMP", "FLAX", "KENAF", "JUTE", "SOYBEANS"], //! Might be illegal!!
	CHICKPEAS: ["CHICKPEAS", "LENTILS", "PEAS", "FABA BEANS", "LUPINS"], //!Kenaf
	SOYBEANS: ["SOYBEANS", "PEANUTS", "LENTILS", "MUNG BEANS", "PEAS"],
	RICE: ["RICE", "SUGARCANE", "WETLAND TARO", "WATER CHESTNUT", "LOTUS"], //!remove the  
};

const mockApiResponse = (data: number[]) => {
	console.log("Simulating API call to watsonX Model for location: ", data);
	return new Promise((resolve) => {
		// Randomly select one of the crop keys
		const cropKeys = Object.keys(related_crops);
		const selectedCrop = cropKeys[Math.floor(Math.random() * cropKeys.length)] as keyof typeof related_crops;

		// Get the corresponding crop list
		const crops_list = related_crops[selectedCrop];

		// Create weights based on the cropWeights mapping
		const weights = crops_list.map((crop) => cropWeights[crop] || 0.1); // Default to 0.1 if not found

		// Pick 3-5 crops based on their weights
		const numCrops = Math.floor(Math.random() * 3) + 3; // Random number between 3 and 5
		const selectedCrops: { crop: string; confidence: string }[] = [];
		const usedIndices = new Set();

		for (let i = 0; i < numCrops; i++) {
			let randomIndex;
			do {
				randomIndex = weightedRandom(weights);
			} while (usedIndices.has(randomIndex)); // Ensure no duplicates
			usedIndices.add(randomIndex);

			selectedCrops.push({
				crop: crops_list[randomIndex],
				confidence: (Math.random() * 0.15 + 0.85).toFixed(2), // Random confidence close to 1
			});
		}

		// Return the mock response after 2 seconds
		setTimeout(() => {
			resolve({
				status: 200,
				data: {
					modelId: `model-${Math.random().toString(36).substr(2, 9)}`,
					version: "2023-05-29",
					predictions: selectedCrops,
					metadata: {
						timestamp: new Date().toISOString(),
						executionTime: "2.0s",
					},
				},
			});
		}, 3000); // Simulate network delay
	});
};

// Helper function to pick random index based on weights
const weightedRandom = (weights) => {
	const sum = weights.reduce((acc, weight) => acc + weight, 0);
	let rand = Math.random() * sum;

	for (let i = 0; i < weights.length; i++) {
		if (rand < weights[i]) {
			return i;
		}
		rand -= weights[i];
	}
	return weights.length - 1; // Fallback, should never happen
};

//! Usage Example
// mockApiResponse().then((response) => {
// 	console.log(response);
// });


const demoCrops = {
	status: 200,
	data: {
		modelId: "model-demo123",
		version: "2023-05-29",
		predictions: [
			{
				crop: "Groundnuts_JL24",
				confidence: (Math.random() * 0.15 + 0.85).toFixed(2), // Random confidence close to 1
			},
			{
				crop: "Beans_Katumani",
				confidence: (Math.random() * 0.15 + 0.85).toFixed(2),
			},
			{
				crop: "Butternut_Squash_Honeynut",
				confidence: (Math.random() * 0.15 + 0.85).toFixed(2),
			},
			{
				crop: "Chillies_Scotch_Bonnet",
				confidence: (Math.random() * 0.15 + 0.85).toFixed(2),
			},
			{
				crop: "Cucumber_Marketmore_76",
				confidence: (Math.random() * 0.15 + 0.85).toFixed(2),
			},
			{
				crop: "Eggplant_Florida_High_Bush",
				confidence: (Math.random() * 0.15 + 0.85).toFixed(2),
			},
		],
		metadata: {
			timestamp: new Date().toISOString(),
			executionTime: "0.5s",
		},
	},
};


export const getMockScoreModel = async (longitude: number, latitude: number) => {
	try {
		// const rawWeatherData = getWeatherInfo(latitude, longitude);
		const response = await mockApiResponse([longitude, latitude]);
		// return (response as ApiResponse).data;
		return demoCrops.data;
	} catch (error) {
		console.error("Error in getScoreModel:", error);
		return null;
	}
};
