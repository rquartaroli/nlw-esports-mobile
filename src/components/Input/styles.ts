import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: THEME.COLORS.BACKGROUND_900,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    color: THEME.COLORS.TEXT,
  }
});