//this page constains strings containing the styling for different fonts used in the app
import tw from "twrnc";
import { COLORS } from "./Colors";

export const FONTS = {
	LARGE_TITLE: [tw`text-neutral-700/opacity-80 text-xl font-extrabold`, { fontFamily: "Inter" }],
	GREEN_TITLE: [tw`text-[15px] font-extrabold`, { color: COLORS.ACCENT_COLOR }],
	SNOW_TITLE: [tw`w-[214.57px] h-[34px] text-white text-xl font-extrabold`, { color: COLORS.PRIMARY_COLOR }],
	REGULAR_FONT: [tw`text-black text-xs font-normal`, { color: COLORS.TEXT_COLOR }],
	SNOW_REGULAR_FONT: [tw`w-[175px] h-[59px] text-white text-xs font-semibold`, { color: COLORS.TEXT_COLOR }],
	REGULAR_BOLD_FONT: [tw`text-black text-[15px] font-extrabold`, { color: COLORS.TEXT_COLOR }],
	HIGHLIGHTED_TEXT_FONT: [tw`text-neutral-700 text-xs font-extrabold`, { color: COLORS.TEXT_COLOR }],
};
