import { ImageBackground } from "expo-image";

// TODO: Image needs to be preloaded to avoid flashing on first load
export default function GradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require('@/assets/images/background-gradient.jpg')}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </ImageBackground>
  );
}
