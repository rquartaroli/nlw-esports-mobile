import { View, Text, TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { styles } from './styles';
import { Input } from '../Input';

export interface FormData {
  name: string
  yearsPlaying: string
  discord: string
}

interface Props extends TextInputProps {
  control: Control<FormData>
  name: "name" | "yearsPlaying" | "discord" 
  error?: string
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input  
            onChangeText={onChange}
            value={value}
            error={error}
            {...rest}
          />
        )}
        name={name}
      />
      { error 
      &&
        <Text style={styles.error}>
          { error }
        </Text>
      }
    </View>
  );
}