import tw from "twrnc";
import { COLORS } from "./Colors";
export const LARGE_CONTAINER_STYLING = {
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FP: [tw`my-5 w-[95%] h-[200px] left-0 rounded-[30px] bg-white-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	IMAGE_IN_LARGE_CONTAINER_STYLING_FP: [tw`w-full h-{60%} rounded-[40px]`],
	LARGE_ROUNDED_STYLING: [tw`my-3 w-[80%] h-[200px] rounded-[40px] justify-center items-center`, { borderWidth: 1, borderColor: COLORS.ACCENT_COLOR }],


	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING: [tw`my-2 flex-col w-[90%] h-[50px] bg-white-100 rounded-[20px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],
	IMAGE_IN_SMALL_CONTAINER_STYLING_FP:  [tw`my-4 justify-start top-12 left--25 w-1/6 h-1/6 rounded-[25px]`,{borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],


	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_INSIGHT: [tw`my-5 flex-col w-[95%] h-[500px] bg-white-100 rounded-[30px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_HOWTO: [tw`my-3 flex-col w-[95%] h-[210px] bg-grey-100 rounded-[0px] `, {overflow: "hidden"}],
	IMAGE_IN_SMALL_CONTAINER_STYLING_HOWTO:  [tw`my-1 justify-start top-5 left-1 w-[45%] h-[70%] rounded-[1px]`,{borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_MENU: [tw`my-12 w-[55%] h-[9%] right-0 rounded-[20px] bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],

};

export const OVERLAY_STYLING = [tw`bg-black bg-opacity-0 w-full h-full rounded-[30px]`];

export const SMALL_OVERLAY_STYLING = [tw`w-full h-full rounded-[30px]`];

export const TOP_PADDING = [tw`p-2`];