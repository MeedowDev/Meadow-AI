import tw from "twrnc";
import { COLORS } from "./Colors";
export const LARGE_CONTAINER_STYLING = {
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING: [tw`my-4 w-[90%] h-[206px] rounded-[30px] bg-gray-300 justify-center items-center`, {overflow: "hidden"}],
	IMAGE_IN_LARGE_CONTAINER_STYLING: [tw`w-full h-full rounded-[30px]`],
	LARGE_ROUNDED_STYLING: [tw`my-4 w-[90%] h-[206px] rounded-[30px] justify-center items-center`, { borderWidth: 1, borderColor: COLORS.ACCENT_COLOR }],


	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING: [tw`my-4 flex-col w-[90%] h-[170px] bg-white-100 rounded-[30px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],
	IMAGE_IN_SMALL_CONTAINER_STYLING:  [tw`justify-start top-5 left-4 w-1/4 h-1/3 rounded-[25px]`,{borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],
};

export const OVERLAY_STYLING = [tw`bg-black bg-opacity-0 w-full h-full rounded-[30px]`];

export const SMALL_OVERLAY_STYLING = [tw`w-[70%] h-[90%] rounded-[30px]`];

export const TOP_PADDING = [tw`p-5`];