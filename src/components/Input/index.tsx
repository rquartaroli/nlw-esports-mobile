import { TextInput, TextInputProps } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface InputProps extends TextInputProps {
  error?: string
}

export function Input({ error, ...rest}: InputProps) {
  return (
    <TextInput 
      placeholderTextColor={THEME.COLORS.CAPTION_400}
      style={[styles.container, { borderWidth: error ? 2 : 0 }, { borderColor: error ? THEME.COLORS.ALERT : '' }]}
      {...rest}
    />
  );
}
