import { ImageBackground } from "expo-image";

/**
 * This component is used to display a gradient background image.
 */
export default function GradientBackground({ children }: { children: React.ReactNode }) {
  // TODO: Image needs to be preloaded to avoid flashing on first load
  const image = require('@/assets/images/background-gradient.jpg');
  return (
    <ImageBackground
      source={image}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </ImageBackground>
  );
}
