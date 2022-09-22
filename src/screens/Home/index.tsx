import { useEffect, useRef, useState } from 'react';
import { Image, FlatList, ScrollView, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { MagnifyingGlassPlus, GameController, Check, CaretDown } from "phosphor-react-native";

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { THEME } from '../../theme';
import { FormData, InputForm } from '../../components/InputForm';
import { TextInputMask } from 'react-native-masked-text';
import api from '../../services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome/Nickname é obrigatório'),
  yearsPlaying: Yup.number().typeError('Informe um valor numérico').positive('Valor não pode ser negativo').required('Não pode ser vazio'),
  discord: Yup.string().required('Discord é obrigatório'),
})

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isCreatingAds, setIsCreatingAds] = useState(false);
  const [reloadGames, setReloadGames] = useState(false);

  const { 
    control, 
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const [showSelectionGames, setShowSelectionGames] = useState(false);
  const [idGameSelected, setIdGameSelected] = useState('');
  const [gameSelected, setGameSelected] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');
  const [isInvalidHourStart, setIsInvalidHourStart] = useState(false);
  const [isInvalidHourEnd, setIsInvalidHourEnd] = useState(false);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [weekDaysEmpty, setWeekDaysEmpty] = useState(false);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  let refHourStart = useRef<any>();
  let refHourEnd = useRef<any>();

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  function handleSelectGame({ id, title }: GameCardProps) {
    setIdGameSelected(id)
    setGameSelected(title)
    setShowSelectionGames(false)
  }

  function addDayOfWeek(numberDay: string) {
    setWeekDaysEmpty(false)
    const days = [...weekDays];
    days.push(numberDay)
    setWeekDays(days)
  }

  function removeDayOfWeek(numberDay: string) {
    const dayForRemove = weekDays.findIndex(day => day === numberDay)
    weekDays.splice(dayForRemove, 1)
    setWeekDays([...weekDays])
  }

  function resetFields() {
    reset();
    setIdGameSelected('');
    setGameSelected('');
    setHourStart('');
    setHourEnd('');
    setWeekDays([]);
    setUseVoiceChannel(false);
  }

  async function handleCreateAds(form: FormData) {

    if(idGameSelected === 'vazio' || idGameSelected === '') {
      Alert.alert('Ops', 'Selecione pelo menos 1 game.');
      setIdGameSelected('vazio');
      return;
    }

    if(!refHourStart.current.isValid()) {
      setIsInvalidHourStart(true)
      return;
    }
    setIsInvalidHourStart(false)

    if(!refHourEnd.current.isValid()) {
      setIsInvalidHourEnd(true)
      return;
    }
    setIsInvalidHourEnd(false)

    if(weekDays.length <= 0) {
      setWeekDaysEmpty(true)
      return
    }
    setWeekDaysEmpty(false)

    try {
      setIsCreatingAds(true)

      await api.post(`/games/${idGameSelected}/ads`, {
        name: form.name,
        yearsPlaying: form.yearsPlaying,
        discord: form.discord,
        weekDays: weekDays.map(Number),
        hourStart: hourStart,
        hourEnd: hourEnd,
        useVoiceChannel: useVoiceChannel
      });

      Alert.alert('Anúncio Criado', 'Anúncio criado com sucesso!')
      resetFields()
      setReloadGames(!reloadGames)
      setShowModal(false)
    } catch (error) {
      console.log('error')
      Alert.alert('Erro', 'Erro ao tentar criar o anúncio!')
    } finally {
      setIsCreatingAds(false)
    }
  }

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await api.get(`/games`)
        setGames(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchGames();
  }, [reloadGames])

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.logo} 
            source={logoImg} 
          />

          <Heading 
            title="Encontre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />

          <FlatList 
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <GameCard 
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.contentList}
          />

          <View style={styles.adsBanner}>
            <View style={styles.wrapperInfoAds}>
              <Text style={styles.infoAdsBold}>
                Não encontrou seu duo?
              </Text>
              <Text style={styles.infoAds}>
                Publique um anúncio para encontrar novos players!
              </Text>
            </View>

            <TouchableOpacity 
              onPress={() => setShowModal(true)}
              style={styles.buttonAdsBanner}
            >
              <MagnifyingGlassPlus size={24} color={THEME.COLORS.TEXT} />
              <Text style={styles.infoButtonAds}>
                Publicar anúncio
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="fade"
            transparent
            visible={showModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={() => setShowModal(false)}
                  >
                    <MaterialIcons 
                      name="close"
                      size={20}
                      color={THEME.COLORS.CAPTION_500}
                    />
                  </TouchableOpacity>

                  <Text style={styles.titleModal}>
                    Publique um anúncio
                  </Text>

                  <Text style={styles.label}>
                    Qual o game?
                  </Text>
                  <View style={{ width: '100%', position: 'relative' }}>
                    <TouchableOpacity
                      onPress={() => setShowSelectionGames(!showSelectionGames)}
                      style={[styles.buttonSelect, , { borderWidth: idGameSelected.length === 5 ? 2 : 0 }, { borderColor: idGameSelected.length === 5 ? THEME.COLORS.ALERT : '' }]}
                    >
                      <Text style={[styles.placeHoldSelect, { color: gameSelected ? THEME.COLORS.TEXT : THEME.COLORS.CAPTION_500}]}>
                        {gameSelected ? gameSelected : 'Selecione o game'}
                      </Text>
                      <CaretDown size={20} color={THEME.COLORS.CAPTION_400} />
                    </TouchableOpacity>
                    {idGameSelected.length === 5
                    &&
                      <Text style={styles.error}>Necessário selecionar um game.</Text>
                    }

                    {showSelectionGames
                    &&
                      <View style={{ position: 'absolute', top: '98%', width: '100%' }}>
                        {games.map(game => 
                          <TouchableOpacity
                            key={game.id}
                            onPress={() => handleSelectGame(game)}
                            style={styles.selectOption}
                          >
                            {
                              idGameSelected === '' 
                              ?
                              <View />
                              :
                              game.id === idGameSelected
                              ?
                              <Check size={16} color={THEME.COLORS.SUCCESS} />
                              :
                              <View style={{ width: 16, height: 16 }} />
                            }
                            <Text style={[styles.textSelect, { marginLeft: idGameSelected === '' ? 0 : 8 }]}>
                              {game.title}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    }
                  </View>

                  <Text style={styles.label}>
                    Seu nome? (ou nickname)
                  </Text>
                  <InputForm 
                    name="name"
                    control={control}
                    placeholder="Como te chamam no game?"
                    autoCorrect={false}
                    error={errors.name && errors.name.message}
                  />

                  <Text style={styles.label}>
                    Joga há quantos anos?
                  </Text>
                  <InputForm 
                    name="yearsPlaying"
                    control={control}
                    placeholder="Tudo bem ser ZERO"
                    keyboardType="numeric"
                    maxLength={2}
                    error={errors.yearsPlaying && errors.yearsPlaying.message}
                  />

                  <Text style={styles.label}>
                    Qual seu Discord?
                  </Text>
                  <InputForm 
                    name="discord"
                    control={control}
                    placeholder="Usuário#0000"
                    autoCorrect={false}
                    error={errors.discord && errors.discord.message}
                  />

                  <Text style={styles.label}>
                    Qual horário do dia?
                  </Text>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '40%' }}>
                      <Text style={styles.labelSecondary}>
                        De
                      </Text>
                      <TextInputMask 
                        style={[styles.inputMask, { borderWidth: isInvalidHourStart ? 2 : 0 }, { borderColor: isInvalidHourStart ? THEME.COLORS.ALERT : '' }]}
                        type="datetime"
                        options={{
                          format: 'HH:mm'
                        }}
                        maxLength={5}
                        onChangeText={setHourStart}
                        value={hourStart}
                        ref={refHourStart}
                      />
                      {isInvalidHourStart
                      &&
                        <Text style={styles.error}>Horário inválido.</Text>
                      }
                    </View>
                    <View style={{ width: '40%', marginLeft: 8 }}>
                      <Text style={styles.labelSecondary}>
                        Até
                      </Text>
                      <TextInputMask 
                        style={[styles.inputMask, { borderWidth: isInvalidHourEnd ? 2 : 0 }, { borderColor: isInvalidHourEnd ? THEME.COLORS.ALERT : '' }]}
                        type="datetime"
                        options={{
                          format: 'HH:mm'
                        }}
                        maxLength={5}
                        onChangeText={setHourEnd}
                        value={hourEnd}
                        ref={refHourEnd}
                      />
                      {isInvalidHourEnd
                      &&
                        <Text style={styles.error}>Horário inválido.</Text>
                      }
                    </View>
                  </View>

                  <Text style={styles.label}>
                    Quando costuma jogar?
                  </Text>
                  <View style={{ width: '100%', flexDirection: 'row', borderWidth: weekDaysEmpty ? 2 : 0 , borderColor: weekDaysEmpty ? THEME.COLORS.ALERT : ''  }}>
                    <TouchableOpacity 
                      onPress={() => weekDays.includes('0') ? removeDayOfWeek('0') : addDayOfWeek('0')}
                      style={[styles.weekDaysButton, { backgroundColor: `${weekDays.includes('0') ? THEME.COLORS.PRIMARY : THEME.COLORS.BACKGROUND_900}` }]}
                    >
                      <Text style={styles.weekDay}>
                        D
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => weekDays.includes('1') ? removeDayOfWeek('1') : addDayOfWeek('1')}
                      style={[styles.weekDaysButton, { backgroundColor: `${weekDays.includes('1') ? THEME.COLORS.PRIMARY : THEME.COLORS.BACKGROUND_900}` }]}
                    >
                      <Text style={styles.weekDay}>
                        S
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => weekDays.includes('2') ? removeDayOfWeek('2') : addDayOfWeek('2')}
                      style={[styles.weekDaysButton, { backgroundColor: `${weekDays.includes('2') ? THEME.COLORS.PRIMARY : THEME.COLORS.BACKGROUND_900}` }]}
                    >
                      <Text style={styles.weekDay}>
                        T
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => weekDays.includes('3') ? removeDayOfWeek('3') : addDayOfWeek('3')}
                      style={[styles.weekDaysButton, { backgroundColor: `${weekDays.includes('3') ? THEME.COLORS.PRIMARY : THEME.COLORS.BACKGROUND_900}` }]}
                    >
                      <Text style={styles.weekDay}>
                        Q
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => weekDays.includes('4') ? removeDayOfWeek('4') : addDayOfWeek('4')}
                      style={[styles.weekDaysButton, { backgroundColor: `${weekDays.includes('4') ? THEME.COLORS.PRIMARY : THEME.COLORS.BACKGROUND_900}` }]}
                    >
                      <Text style={styles.weekDay}>
                        Q
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => weekDays.includes('5') ? removeDayOfWeek('5') : addDayOfWeek('5')}
                      style={[styles.weekDaysButton, { backgroundColor: `${weekDays.includes('5') ? THEME.COLORS.PRIMARY : THEME.COLORS.BACKGROUND_900}` }]}
                    >
                      <Text style={styles.weekDay}>
                        S
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => weekDays.includes('6') ? removeDayOfWeek('6') : addDayOfWeek('6')}
                      style={[styles.weekDaysButton, { marginRight: 0, backgroundColor: `${weekDays.includes('6') ? THEME.COLORS.PRIMARY : THEME.COLORS.BACKGROUND_900}` }]}
                    >
                      <Text style={styles.weekDay}>
                        S
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {weekDaysEmpty
                  &&
                    <Text style={styles.error}>Selecione pelo menos 1 dia da semana.</Text>
                  }

                  <TouchableOpacity
                    onPress={() => setUseVoiceChannel(!useVoiceChannel)}
                    style={styles.buttonCheckBox}
                  >
                    <View style={styles.checkBox}>
                      { useVoiceChannel && <Check size={16} color={THEME.COLORS.SUCCESS} /> }  
                    </View>
                    <Text style={styles.textCheckBox}>
                      Costumo me conectar ao chat de voz
                    </Text>
                  </TouchableOpacity>

                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity 
                      onPress={() => setShowModal(false)}
                      style={styles.buttonAdsCancel}
                    >
                      <Text style={styles.infoButtonAds}>
                        Cancelar
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={handleSubmit(handleCreateAds)}
                      style={styles.buttonAdsBanner}
                      disabled={isCreatingAds}
                    >
                      <GameController size={20} color={THEME.COLORS.TEXT} />
                      <Text style={styles.infoButtonAds}>
                        Encontrar duo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>

        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}