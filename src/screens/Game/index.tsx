import { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { THEME } from '../../theme';
import { styles } from './styles';

import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import api from '../../services/api';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    try {
      const response = await api.get(`/ads/${adsId}/discord`)
      setDiscordDuoSelected(response.data.discord)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await api.get(`/games/${game.id}/ads`)
        setDuos(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchGame();
  }, [])

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo 
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>
            <Image
              source={logoImg}
              style={styles.logo}
            />
            <View style={styles.right} />
          </View>

          <Image 
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading 
            title={game.title}
            subtitle="Conecte-se e comece a jogar!"
          />

          <FlatList 
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DuoCard 
                data={item} 
                onConnect={() => getDiscordUser(item.id)} 
              />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda.
              </Text>
            )}
          />

          <DuoMatch 
            visible={discordDuoSelected.length > 0}
            discord={discordDuoSelected}
            onClose={() =>  setDiscordDuoSelected('')}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}