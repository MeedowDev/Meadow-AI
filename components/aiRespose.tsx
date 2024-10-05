import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import Markdown from "react-native-markdown-display";
import tw from "twrnc";
import PulsingComponent from "./pulsingComponent";

interface AiResponseProps {
	aiTextParam: string;
	color: string;
}

const AiResponse: React.FC<AiResponseProps> = ({ aiTextParam, color }) => {
	const defaultSpeed = 5; // Default typing speed
	const [response, setResponse] = useState("");
	const [isTyping, setIsTyping] = useState(true);
	const [showPulsing, setShowPulsing] = useState(true);

	useEffect(() => {
		const aiText = aiTextParam ;
		let currentIndex = 0;
		setResponse("");
		setShowPulsing(true);

		let typingTimeout: NodeJS.Timeout;
		let pulsingTimeout: NodeJS.Timeout;

		const typeText = () => {
			if (aiText && currentIndex < aiText.length) {
				setResponse((prev) => prev + aiText[currentIndex]);

				let delay = defaultSpeed;

				// Adjust the delay randomly for punctuation characters
				if (["!", "?", "."].includes(aiText[currentIndex])) {
					delay = Math.random() * (80 - 40) + 40; // Random delay between 40 and 80ms
				}

				currentIndex++;
				typingTimeout = setTimeout(typeText, delay); // Recursively call typeText with dynamic delay
			} else {
				setIsTyping(false);
				// Hide pulsing component after typing is complete
				pulsingTimeout = setTimeout(() => {
					setShowPulsing(false);
				}, 3000);
			}
		};

		// Start typing effect
		typeText();

		// Cleanup
		return () => {
			clearTimeout(typingTimeout);
			clearTimeout(pulsingTimeout);
		};
	}, []);

	return (
		<View style={tw`flex-col items-start min-h-[3rem]`}>
			<Markdown style={{ body: { color: color } }}>{response}</Markdown>
			{showPulsing && <PulsingComponent />}
		</View>
	);
};

export default AiResponse;
