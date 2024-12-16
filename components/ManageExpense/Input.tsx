import { StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { GlobalStyles } from '@/constants/styles'

type Props = {
  style?: ViewStyle
  label: string
  invalid: boolean
  textInputConfig?: TextInputProps
}

const Input = ({ style, label, invalid, textInputConfig }: Props) => {
  let inputStyles: TextStyle[] = [styles.input]

  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiline)
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid ? styles.invalidLabel : null]}>{label}</Text>
      <TextInput style={inputStyles} keyboardType="default" {...textInputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 10,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
})
