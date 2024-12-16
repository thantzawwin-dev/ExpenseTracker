import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '@/store/expenses-context'
import { getDateMinusDays } from '@/util/date'
import { fetchExpenses } from '@/util/http'
import { Expenses } from '@/constants/dummy_expenses'
import LoadingOverlay from '@/components/UI/LoadingOverlay'
import ErrorOverlay from '@/components/UI/ErrorOverlay'

type Props = {}

const RecentExpense = (props: Props) => {
  const expensesCtx = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError('Could not fetch expenses!')
        // Handle errors, e.g., log error, display error message to user
        console.error('Error fetching expenses:', error)
      }
      setIsFetching(false)
    }

    getExpenses()
  }, [])

  function errorHandler() {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }
  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return expense.date >= date7DaysAgo && expense.date <= today
  })

  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days." />
}

export default RecentExpense

const styles = StyleSheet.create({})
