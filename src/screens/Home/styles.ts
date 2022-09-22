import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
  },
  adsBanner: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.SHAPE,
    paddingHorizontal: 32,
    paddingVertical: 24,
    marginVertical: 32,
    borderRadius: 8,
    borderTopWidth: 2,
    borderTopColor: THEME.COLORS.PRIMARY,
  },
  wrapperInfoAds: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoAdsBold: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
  },
  infoAds: {
    color: THEME.COLORS.CAPTION_400,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    textAlign: 'center',
  },
  buttonAdsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: THEME.COLORS.PRIMARY,
    color: THEME.COLORS.TEXT,
    borderRadius: 4,
  },
  infoButtonAds: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.OVERLAY
  },
  modalContent: {
    width: 311,
    backgroundColor: THEME.COLORS.SHAPE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  titleModal: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    marginBottom: 16
  },
  label: {
    width: '100%',
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    marginTop: 16,
    marginBottom: 8,
  },
  labelSecondary: {
    width: '100%',
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    marginTop: -8,
    marginBottom: 8,
  },
  buttonSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.BACKGROUND_900,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  placeHoldSelect: {
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
  selectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    zIndex: 5,
  },
  textSelect: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
  },
  weekDaysButton: {
    width: 32,
    height: 32,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  weekDay: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.BOLD,
  },
  buttonCheckBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  checkBox: {
    width: 24,
    height: 24,
    padding: 4,
    borderRadius: 4,
    backgroundColor: THEME.COLORS.BACKGROUND_900,
  },
  textCheckBox: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    marginLeft: 8,
  },
  buttonAdsCancel: {
    alignItems: 'center',
    marginTop: 16,
    marginRight: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: THEME.COLORS.CAPTION_500,
    color: THEME.COLORS.TEXT,
    borderRadius: 4,
  },
  inputMask: {
    width: '100%',
    backgroundColor: THEME.COLORS.BACKGROUND_900,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    color: THEME.COLORS.TEXT,
  },
  error: {
    color: THEME.COLORS.ALERT,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    marginTop: 2,
  }
});