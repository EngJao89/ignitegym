import { VStack, Image } from 'native-base';

import BackgroundImg from '@assets/background.png';


export function SignIn(){
  return(
    <VStack flex={1} px={10} pb={16}>
      <Image 
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />
    </VStack>
  );
}