import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Home(){
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState([
    'Puxada Frontal', 
    'Remada curvada', 
    'Remada Unilateral', 
    'Levantamento terra'
  ]);
  const [groupSelected, setGroupSelected] = useState('costas');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGroups();
  },[]);

  return(
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Group 
          name={item}
          isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
          onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard 
              onPress={() => handleOpenExerciseDetails()}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20
          }}
        />
      </VStack>
    </VStack>
  )
}