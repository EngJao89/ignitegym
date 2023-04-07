import { Heading, HStack, Text, VStack, Icon } from 'native-base';

export function HomeHeader() {

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          João Ricardo
        </Heading>
      </VStack>
    </HStack>
  );
}