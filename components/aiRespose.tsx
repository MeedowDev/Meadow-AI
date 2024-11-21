import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import tw from "twrnc";
import PulsingComponent from "./pulsingComponent";

interface AiResponseProps {
	aiTextParam: string | string[]; // Can be a string or an array of strings
	color: string;
}

const AiResponse: React.FC<AiResponseProps> = ({ aiTextParam, color }) => {
	const defaultSpeed = 150; // Default base delay (can be adjusted)
	const pauseBetweenStrings = 1000; // Pause between strings when `aiTextParam` is an array
	const [response, setResponse] = useState("");
	const [isTyping, setIsTyping] = useState(true);
	const [showPulsing, setShowPulsing] = useState(true);


	// Split the text into word packets (groups of 1 to 3 words)
	const createWordPackets = (text: string) => {
		const words = text.split(" ");
		let packets: string[] = [];

		let i = 0;
		while (i < words.length) {
			// Randomly decide the packet size (1 to 3 words)
			const packetSize = Math.floor(Math.random() * 3) + 1;
			packets.push(words.slice(i, i + packetSize).join(" "));
			i += packetSize;
		}

		return packets;
	};

	useEffect(() => {
		let typingTimeout: NodeJS.Timeout;
		let pulsingTimeout: NodeJS.Timeout;

		// Function to type out each string in the array one by one
		const typeStringsSequentially = async (strings: string[]) => {
			for (let i = 0; i < strings.length; i++) {
				await new Promise<void>((resolve) => {
					const wordPackets = createWordPackets(strings[i]);
					let currentPacketIndex = 0;

					const typeText = () => {
						if (currentPacketIndex < wordPackets.length) {
							setResponse((prev) => prev + " " + wordPackets[currentPacketIndex]);

							let delay = defaultSpeed;
							// Adjust the delay after punctuation to simulate thinking pauses
							if (/[!?.,]/.test(wordPackets[currentPacketIndex])) {
								delay = Math.random() * (500 - 250) + 250; // Random delay between 250ms and 500ms
							} else {
								// Randomize delay between packets to simulate varying typing speed
								delay = Math.random() * (120 - 80) + 80; // Random delay between 80ms and 120ms
							}

							currentPacketIndex++;
							typingTimeout = setTimeout(typeText, delay);
						} else {
							resolve();
						}
					};
					if (typeStringsSequentially.length > 0) {
						setResponse("");
					}
					// Start typing the current string
					typeText();
				});

				// Pause after each string is typed
				await new Promise((resolve) => setTimeout(resolve, pauseBetweenStrings));
			}

			// When done typing all strings
			setIsTyping(false);
			pulsingTimeout = setTimeout(() => {
				setShowPulsing(false);
			}, 3000);
		};

		// Start the typing process based on whether `aiTextParam` is a string or an array
		if (typeof aiTextParam === "string") {
			console.log(aiTextParam)
			const wordPackets = createWordPackets(aiTextParam);
			typeStringsSequentially([aiTextParam]); // Treat it as a single string array
		} else if (Array.isArray(aiTextParam)) {
			typeStringsSequentially(aiTextParam); // Handle array of strings
		}

		// Cleanup
		return () => {
			clearTimeout(typingTimeout);
			clearTimeout(pulsingTimeout);
		};
	}, [aiTextParam]);

	return (
		<View style={tw`flex-col items-start min-h-[3rem] w-[100%]`}>
			<Markdown style={{ body: tw.style(`w-[100%]`) }}>{response}</Markdown>
			{showPulsing && <PulsingComponent />}
		</View>
	);
};

export default AiResponse;
