// types.ts
export type RootStackParamList = {
	Home: undefined;
	Watson: undefined;
	Menu: undefined;
	Insights: undefined;
	AdvisorTab: undefined;
	FarmersPointScreen: undefined;
	NewsScreen: undefined;
	BookMarkedScreen: undefined;
	Prediction: undefined;
	SpecificsScreen: {
		cropIndex: number;
		cropName: string;
	};
};
