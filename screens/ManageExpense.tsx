import { StyleSheet, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { RootStackParamList } from '@/App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import IconButton from '@/components/UI/IconButton'
import { GlobalStyles } from '@/constants/styles'
import Button from '@/components/UI/Button'
import { ExpensesContext } from '@/store/expenses-context'
import ExpenseForm, { FormSubmitProps } from '@/components/ManageExpense/ExpenseForm'
import { Expense } from '@/constants/dummy_expenses'
import { storeExpense, updateExpense, deleteExpense } from '@/util/http'
import LoadingOverlay from '@/components/UI/LoadingOverlay'
import ErrorOverlay from '@/components/UI/ErrorOverlay'

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>

const ManageExpense = ({ navigation, route }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const expenseCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense: Expense | undefined = expenseCtx.expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler() {
    setIsSubmitting(true)
    try {
      await deleteExpense(editedExpenseId)
      // setIsSubmitting(false)
      expenseCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('Could not delete expense - please try again later!')
      setIsSubmitting(false)
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData: Omit<Expense, 'id'>) {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const storeId = await storeExpense(expenseData)
        expenseCtx.addExpense({ ...expenseData, id: storeId })
      }
      navigation.goBack()
    } catch (error) {
      setError('Could not save expense - please try again later!')
      setIsSubmitting(false)
    }
  }

  function errorHandler() {
    setError(null)
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})
