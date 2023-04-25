import { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import { Routes } from '@routes/index';

import { AuthContext } from "@contexts/AuthContext";

import { THEME } from './src/theme';
import { Loading } from '@components/Loading';

import { 
  useFonts, 
  Roboto_400Regular, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({  Roboto_400Regular, Roboto_700Bold });

  const contextData = useContext(AuthContext);
  return (
    < NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider value={{
        id: '1',
        name: 'João Ricardo',
        email: 'joao.ribeiro@gmail.com',
        avatar: 'joao.png'
      }}>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
