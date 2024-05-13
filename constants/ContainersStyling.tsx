import tw from "twrnc";
import { COLORS } from "./Colors";
export const LARGE_CONTAINER_STYLING = {
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING: [tw`my-4 w-[90%] h-[206px] rounded-[30px] bg-gray-300 justify-center items-center`, {overflow: "hidden"}],
	IMAGE_IN_LARGE_CONTAINER_STYLING: [tw`w-full h-full rounded-[30px]`],
	LARGE_ROUNDED_STYLING: [tw`my-4 w-[90%] h-[206px] rounded-[30px] justify-center items-center`, { borderWidth: 1, borderColor: COLORS.ACCENT_COLOR }],
};

export const OVERLAY_STYLING = [tw`bg-black bg-opacity-50 w-full h-full rounded-[30px]`];

export const TOP_PADDING = [tw`p-5`];
