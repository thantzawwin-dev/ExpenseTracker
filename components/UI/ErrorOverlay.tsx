import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '@/constants/styles'
import Button from '@/components/UI/Button'

type Props = {
  message: string
  onConfirm: () => void
}

const ErrorOverlay = ({ message, onConfirm }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>An error occurred!</Text>
      <Text style={[styles.message, styles.text]}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: { color: 'white', textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: 'bold' },
  message: { fontSize: 14, fontWeight: 'bold' },
})
