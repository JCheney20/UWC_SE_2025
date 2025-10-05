import { YStack, Image } from "tamagui";

type ModalProps = {
  onBackgroundPress: () => void;
  children: React.ReactNode;
};

export default function ModalStyling(props: ModalProps) {
  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0,0,0,0.6)"
      onPress={props.onBackgroundPress}
    >
      <YStack
        backgroundColor="white"
        borderRadius="$4"
        width="80%"
        overflow="hidden"
        onPress={() => { }}
      >
        <Image
          source={require('@/assets/images/modal-header-image.jpg')}
          width="100%"
          height={150}
        />
        <YStack padding="$4" alignItems="center" gap="$3">
          {props.children}
        </YStack>
      </YStack>
    </YStack>
  );
}
