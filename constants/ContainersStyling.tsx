import tw from "twrnc";
import { COLORS } from "./Colors";
export const LARGE_CONTAINER_STYLING = {
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_FARMERSPOINT: [tw` m-1 mt-5 h-[210px]  rounded-[30px] bg-white-100 justify-center items-center`, {overflow: "hidden"}],
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_INSIGHTS: [tw`my-12 h-[210px] rounded-[30px] bg-white-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_EMPTY: [tw`my-5 w-[300px] h-[150px] rounded-[30px] bg-green-500 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_CARDWITHTEXT: [tw`my-1 w-[300px] h-[180px] rounded-[30px] bg-white-500 justify-center items-center`, {borderWidth: 0.8, overflow: "hidden",borderColor: COLORS.SECONDARY_COLOR}],
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ADVISORCARDWITHTEXT: [tw`my-3 w-[300px] h-[110px] rounded-[30px] bg-white-500 justify-center items-center`, {borderWidth: 0.9, overflow: "hidden",borderColor: COLORS.SECONDARY_COLOR}],
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_IMAGEANDTEXT: [tw`my-3 w-[55%] h-[150px] left-1 bg-green-700 justify-center items-center`, {overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	IMAGE_IN_LARGE_CONTAINER_STYLING_FP: [tw`h-{70%}  rounded-[40px]`],
	IMAGE_IN_LARGE_CONTAINER_STYLING_CLICKABLEBUTTONS: [tw`my-2 w-[100%] h-{40%} bottom-3 rounded-[40px]`],
	IMAGE_IN_LARGE_CONTAINER_STYLING_IMAGEANDTEXT: [tw`w-[75%] h-{50%}`],
	LARGE_ROUNDED_STYLING: [tw`my-3 w-[80%] h-[200px] rounded-[40px] justify-center items-center`, { borderWidth: 1, borderColor: COLORS.ACCENT_COLOR }],

	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING: [tw`my-5 flex-col left-2 w-[95%] h-35 bg-white-100 rounded-[30px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],
	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_IMAGEANDTEXT: [tw`my-6 flex-col w-[300px] h-[180px] bg-white-100 `, {borderWidth: 0, overflow: "hidden",  borderColor: COLORS.LIGHT_GRAY }],
	IMAGE_IN_SMALL_CONTAINER_STYLING_FARMERSPOINT:  [tw`my-3 justify-start left-5 w-1/5 h-1/4 rounded-[25px]`,{borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_INSIGHT: [tw`my-5 flex-col w-[95%] h-[500px] bg-white-100 rounded-[30px] `, {borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_HOWTO: [tw`my-5 flex-col w-[85%] left-15 h-[410px] bg-grey-100 rounded-[0px] `, {overflow: "hidden"}],
	IMAGE_IN_SMALL_CONTAINER_STYLING_HOWTO:  [tw`justify-start top-1 left-1 w-[55%] h-[40%] rounded-[100px]`,{borderWidth: 1, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_MENU: [tw`my-5 w-[65%] h-[10%] rounded-[30px] bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	LARGE_ROUNDED_iMAGE_CONTAINER_FREEBUTTON: [tw`my-2 w-[19%] flex-row left-45 top--29 h-[6%] rounded-[20px] bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	LARGE_ROUNDED_iMAGE_CONTAINER_TWOBUTTONSONTHESIDE: [tw`my-1 w-[105%] h-10 rounded-[20px] bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],

	LARGE_ROUNDED_iMAGE_CONTAINER_FREEBUTTON_ADVISOR: [tw`my-1 w-[20%] flex-row left-42 top--29 h-[45%] rounded-[20px] bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_CLICKABLEBUTTONS:[tw`my-12 w-[65%] h-[35%] rounded-[30px] bg-green-500 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],


	SMALL_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT: [tw`my-5 flex-col w-[85%] left-5 h-[410px] bg-grey-100 rounded-[0px] `, {overflow: "hidden"}],
	IMAGE_IN_SMALL_CONTAINER_STYLING_ACCOUNT:  [tw`justify-start top-1 left-1 w-[55%] h-[40%] rounded-[100px]`,{borderWidth: 2, overflow: "hidden",  borderColor: COLORS.ACCENT_COLOR }],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT: [tw`my-12 w-[25%] h-[7%] rounded-[20px] left-15 bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT_LOCATION: [tw`my-39 w-[25%] h-[7%] rounded-[20px] left--18 bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT_CONTACT: [tw`my-25 w-[25%] h-[7%] rounded-[20px] left--1 bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],

	LARGE_ROUNDED_iMAGE_CONTAINER_STYLING_ACCOUNT_FILTERBUTTONS: [tw`my-1 mx-1 w-[30%] h-7 rounded-[30]  bg-black-100 justify-center items-center`, {borderWidth: 1, overflow: "hidden",borderColor: COLORS.ACCENT_COLOR}],
};

export const OVERLAY_STYLING = [tw`bg-black bg-opacity-0 w-full h-[120%] rounded-[30px]`];
export const OVERLAY_STYLING_JUST_TEXT= [tw`bg-black bg-opacity-0 w-full`];
export const OVERLAY_STYLING_FREEBUTTON = [tw`bg-white bg-opacity-100 w-full h-[100%] rounded-[30px]`];
export const OVERLAY_STYLING_TWOBUTTONSONTHESIDE = [tw`bg-green-400 bg-opacity-100 w-full h-[100%] rounded-[30px]`];
export const OVERLAY_STYLING_CLICKABLEBUTTONS = [tw`bg-green bg-opacity-10 w-full h-[120%] rounded-[30px]`];
export const OVERLAY_STYLING_EMPTY = [tw`bg-opacity-10 w-full h-[120%] rounded-[30px]`];


export const OVERLAY_STYLING_HOWTO = [tw`bg-black bg-opacity-0 w-[70%] h-full rounded-[30px]`];

export const OVERLAY_STYLING_ACCOUNT = [tw`bg-black bg-opacity-0 w-full h-full rounded-[30px]`];


export const SMALL_OVERLAY_STYLING = [tw`w-full h-full rounded-[30px]`];

export const TOP_PADDING = [tw`p-2`];

export const SPACER = [tw`h-10`];