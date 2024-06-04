import tw from "twrnc";
import { COLORS } from "./Colors";
export const LARGE_CONTAINER_STYLING = {
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FP: [tw`my-5 w-[95%] h-[200px] left-0 rounded-[30px] bg-white-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_IMAGEANDTEXT: [tw`my-3 w-[55%] h-[150px] top--2 left-1 bg-white-100 justify-center items-center`, {overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	IMAGE_IN_LARGE_CONTAINER_STYLING_FP: [tw`w-[50%] h-{60%} rounded-[40px]`],
	IMAGE_IN_LARGE_CONTAINER_STYLING_IMAGEANDTEXT: [tw`w-[75%] h-{50%}`],
	LARGE_ROUNDED_STYLING: [tw`my-3 w-[80%] h-[200px] rounded-[40px] justify-center items-center`, { borderWidth: 1, borderColor: COLORS.ACCENT_COLOR }],


	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING: [tw`my-2 flex-col w-[90%] h-[50px] bg-white-100 rounded-[20px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],
	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_IMAGEANDTEXT: [tw`my-6 flex-col w-[310px] h-[180px] bg-white-100 `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],
	IMAGE_IN_SMALL_CONTAINER_STYLING_FP:  [tw`my-4 justify-start top-12 left--25 w-1/6 h-1/6 rounded-[25px]`,{borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_INSIGHT: [tw`my-5 flex-col w-[95%] h-[500px] bg-white-100 rounded-[30px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_HOWTO: [tw`my-5 flex-col w-[85%] left-15 h-[410px] bg-grey-100 rounded-[0px] `, {overflow: "hidden"}],
	IMAGE_IN_SMALL_CONTAINER_STYLING_HOWTO:  [tw`justify-start top-1 left-1 w-[55%] h-[40%] rounded-[100px]`,{borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_MENU: [tw`my-12 w-[55%] h-[9%] rounded-[20px] bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],


	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT: [tw`my-5 flex-col w-[85%] left-5 h-[410px] bg-grey-100 rounded-[0px] `, {overflow: "hidden"}],
	IMAGE_IN_SMALL_CONTAINER_STYLING_ACCOUNT:  [tw`justify-start top-1 left-1 w-[55%] h-[40%] rounded-[100px]`,{borderWidth: 2, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT: [tw`my-12 w-[25%] h-[7%] rounded-[20px] left-15 bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT_LOCATION: [tw`my-39 w-[25%] h-[7%] rounded-[20px] left--18 bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT_CONTACT: [tw`my-25 w-[25%] h-[7%] rounded-[20px] left--1 bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
};

export const OVERLAY_STYLING = [tw`bg-black bg-opacity-0 w-full h-full rounded-[30px]`];

export const OVERLAY_STYLING_HOWTO = [tw`bg-black bg-opacity-0 w-[70%] h-full rounded-[30px]`];

export const OVERLAY_STYLING_ACCOUNT = [tw`bg-black bg-opacity-0 w-full h-full rounded-[30px]`];


export const SMALL_OVERLAY_STYLING = [tw`w-full h-full rounded-[30px]`];


export const TOP_PADDING = [tw`p-2`];