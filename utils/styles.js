import { StyleSheet } from 'react-native'
import { primary, success, lightGray, white, gray } from "./colors";

export const button = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: '80%',
    marginBottom: 10
  },
  btnPrimary: {
    backgroundColor: primary,
  },
  btnSuccess: {
    backgroundColor: success,
  },
  btnDisabled: {
    backgroundColor: lightGray,
  },
  btnLabel: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});

export const input = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
  },
  text: {
    flex: 0.8,
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
  },
});