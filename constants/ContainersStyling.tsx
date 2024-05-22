import tw from "twrnc";
import { COLORS } from "./Colors";
export const LARGE_CONTAINER_STYLING = {
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FP: [tw`my-5 w-[95%] h-[200px] left-0 rounded-[30px] bg-white-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	IMAGE_IN_LARGE_CONTAINER_STYLING_FP: [tw`w-full h-{60%} rounded-[40px]`],
	LARGE_ROUNDED_STYLING: [tw`my-3 w-[80%] h-[200px] rounded-[40px] justify-center items-center`, { borderWidth: 1, borderColor: COLORS.ACCENT_COLOR }],


	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING: [tw`my-2 flex-col w-[90%] h-[50px] bg-white-100 rounded-[20px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],
	IMAGE_IN_SMALL_CONTAINER_STYLING_FP:  [tw`my-5 justify-start top-12 left--25 w-1/6 h-1/6 rounded-[25px]`,{borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],


	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_INSIGHT: [tw`my-5 flex-col w-[95%] h-[500px] bg-white-100 rounded-[30px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

};

export const OVERLAY_STYLING = [tw`bg-black bg-opacity-0 w-full h-full rounded-[30px]`];

export const SMALL_OVERLAY_STYLING = [tw`w-[70%] h-[90%] rounded-[30px]`];

export const TOP_PADDING = [tw`p-2`];