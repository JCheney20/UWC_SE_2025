
import { YStack, Input, Text, Spinner, View } from "tamagui";
import { useState, useEffect, useRef } from "react";
import { TouchableOpacity, TextInput, Keyboard } from "react-native";

// TODO: Add your Mapbox access token to .env.local
const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Coordinates for Cape Town, to bias search results
const WESTERN_CAPE_PROXIMITY = {
  longitude: 18.4241,
  latitude: -33.9249,
};

type Coords = {
  latitude: number;
  longitude: number;
};

type MapSearchInputProps = {
  onLocationSelect: (coords: Coords, placeName: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

type Feature = {
  place_name: string;
  center: [number, number];
};

export default function MapSearchInput({ 
  onLocationSelect, 
  placeholder = "Enter a location",
  onFocus,
  onBlur
}: MapSearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              searchQuery
            )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&proximity=${WESTERN_CAPE_PROXIMITY.longitude},${WESTERN_CAPE_PROXIMITY.latitude}`
          );
          const data = await response.json();
          setSuggestions(data.features);
        } catch (error) {
          console.error("Error fetching Mapbox suggestions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (isFocused) {
        fetchSuggestions();
      }
    }, 500); // Debounce API calls

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, isFocused]);

  const handleSelectSuggestion = (suggestion: Feature) => {
    const [longitude, latitude] = suggestion.center;
    const coords = { latitude, longitude };
    onLocationSelect(coords, suggestion.place_name);
    setSearchQuery(suggestion.place_name);
    setSuggestions([]);
    setIsFocused(false);
    Keyboard.dismiss(); // Dismiss keyboard
    if (onBlur) onBlur(); // Notify parent of blur
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  }

  const handleBlur = () => {
    // Delay blur to allow suggestion press to register
    setTimeout(() => {
      setIsFocused(false);
      if (onBlur) onBlur();
    }, 200);
  }

  return (
    <View style={{ position: 'relative', width: '100%' }}>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {loading && <Spinner position="absolute" top="$2" right="$2" />}
      {isFocused && suggestions.length > 0 && (
        <YStack
          position="absolute"
          top="$8" // Adjust based on input height
          width="100%"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$4"
          backgroundColor="$background"
          zIndex={99} // High zIndex to appear above other elements
        >
          {suggestions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectSuggestion(item)}
            >
              <Text padding="$2">{item.place_name}</Text>
            </TouchableOpacity>
          ))}
        </YStack>
      )}
    </View>
  );
}
