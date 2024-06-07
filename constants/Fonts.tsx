//this page constains strings containing the styling for different fonts used in the app
import tw from "twrnc";
import { COLORS } from "./Colors";

export const FONTS = {
	LARGE_TITLE: [tw`text-neutral-700/opacity-80 text-xl font-extrabold`, { fontFamily: "Inter" }],
	GREEN_TITLE: [tw`text-[15px] font-extrabold`, { color: COLORS.ACCENT_COLOR }],
	SNOW_TITLE: [tw`w-[254.57px] h-[74px] text-white text-xl font-extrabold`, { color: COLORS.PRIMARY_COLOR }],
	SNOW_TITLE_HOWTO: [tw`w-[114.57px] h-[74px] text-black text-xl font-extrabold`, { color: COLORS.LIGHT_GRAY	 }],
	REGULAR_FONT: [tw`text-black text-xs font-normal`, { color: COLORS.TEXT_COLOR }],
	SNOW_REGULAR_FONT: [tw`text-white text-xs font-semibold`, { color: COLORS.PRIMARY_COLOR }],
	REGULAR_BOLD_FONT: [tw`text-black text-[15px] font-extrabold`, { color: COLORS.TEXT_COLOR }],
	HIGHLIGHTED_TEXT_FONT: [tw`text-neutral-700 text-xs font-extrabold`, { color: COLORS.TEXT_COLOR }],
	SNOW_REGULAR_FONT_TWO: [tw`w-[180px] h-[20px] text-xs font-semibold`, { color: COLORS.TEXT_COLOR }],
	REGULAR_FONT_POINT: [tw`text-black text-xs font-normal`, { color: COLORS.LIGHT_GRAY }],
	SNOW_REGULAR_FONT_POINT_F: [tw`w-[155px] h-[100px] left-20 top-5 text-white text-xs font-normal`, { color: COLORS.LIGHT_GRAY }],
	SNOW_REGULAR_FONT_POINT: [tw`w-[190px] h-[80px] top--25 text-white text-xs font-normal`, { color: COLORS.TEXT_COLOR }],
	SNOW_TITLE_INSIGHTS: [tw`w-[250.57px] h-[44px] text-white text-s font-extrabold`, { color: COLORS.TEXT_COLOR }],
	SNOW_TITLE_MENU: [tw`w-[94.57px] h-[54px] text-white text-xs font-extrabold`, { color: COLORS.LIGHT_GRAY }],
	EDIT_BUTTON_FONT:[tw`fontSize: 14`]
};
