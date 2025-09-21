import { ImageBackground } from "expo-image";

export default function MainPageBackground({ children }: { children: React.ReactNode }) {
	return (
		<ImageBackground
			source={require('../assets/images/background-gradient.jpg')}
			style={{ width: "100%", height: "100%" }}
		>
			{children}
		</ImageBackground>
	);
}
