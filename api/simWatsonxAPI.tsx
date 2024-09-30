
interface CropPrediction {
	crop: string;
	confidence: string;
}

interface ApiResponse {
	status: number;
	data: {
		modelId: string;
		version: string;
		predictions: Array<{
			crop: string;
			relatedCrops: CropPrediction[];
		}>;
		metadata: {
			timestamp: string;
			executionTime: string;
		};
	};
}



const related_crops: { [key: string]: string[] } = {
	WHEAT: ["WHEAT", "OATS", "RYE", "BARLEY", "MILLET"],
	LEGUMES: ["LEGUMES", "LENTILS", "PEAS", "FABA BEANS", "ALFALFA"],
	CORN: ["CORN", "MILLET", "SORGHUM", "SUNFLOWER", "SWEET POTATO"],
	HAYLAGE: ["HAYLAGE", "ALFALFA", "CLOVER", "RYEGRASS", "ORCHARDGRASS"],
	HAY: ["HAY", "ALFALFA", "TIMOTHY", "BERMUDA GRASS", "FESCUE"],
	BARLEY: ["BARLEY", "OATS", "RYE", "TRITICALE", "MILLET"],
	COTTON: ["COTTON", "SOYBEANS", "PEANUTS", "SUNFLOWER", "SESAME"],
	SORGHUM: ["SORGHUM", "MILLET", "MAIZE", "SUNFLOWER", "TEFF"],
	HEMP: ["HEMP", "FLAX", "KENAF", "JUTE", "SOYBEANS"],
	CHICKPEAS: ["CHICKPEAS", "LENTILS", "PEAS", "FABA BEANS", "LUPINS"],
	SOYBEANS: ["SOYBEANS", "PEANUTS", "LENTILS", "MUNG BEANS", "PEAS"],
	RICE: ["RICE", "SUGARCANE", "WETLAND TARO", "WATER CHESTNUT", "LOTUS"],
};

const mockApiResponse = (data: number[]) => {
    console.log("Simulating API call to watsonX Model with data: ", data);
	return new Promise((resolve) => {
		// Randomly select one of the crop keys
		const cropKeys = Object.keys(related_crops);
		const selectedCrop = cropKeys[Math.floor(Math.random() * cropKeys.length)] as keyof typeof related_crops;

		// Get the corresponding crop list
		const crops_list = related_crops[selectedCrop];
		const weights = [0.28, 0.22, 0.2, 0.15, 0.15].slice(0, crops_list.length);

		// Pick 3-5 crops based on their weights
		const numCrops = Math.floor(Math.random() * 3) + 3; // Random number between 3 and 5
		const selectedCrops: { crop: string; confidence: string; }[] = [];
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
					predictions: [
						{
							crop: selectedCrop,
							relatedCrops: selectedCrops,
						},
					],
					metadata: {
						timestamp: new Date().toISOString(),
						executionTime: "2.0s",
					},
				},
			});
		}, 2000); // Simulate network delay
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

export const getMockScoreModel = async (data:number[]) => {
    try {
        const response = await mockApiResponse(data);
		return (response as ApiResponse).data;
    } catch (error) {
        console.error("Error in getScoreModel:", error);
        return null;
    }
};