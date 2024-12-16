import { Expense, Expenses } from '@/constants/dummy_expenses'
import axios from 'axios'

const BACKEND_URL = 'https://expense-tracker-de288-default-rtdb.firebaseio.com'

export const storeExpense = async (expenseData: Omit<Expense, 'id'>): Promise<string> => {
  const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData)
  const id = response.data.name
  return id
}

type Entry<T> = [string, T]

export const fetchExpenses = async (): Promise<Expenses> => {
  const response = await axios.get(BACKEND_URL + '/expenses.json')
  const expensesData: Entry<Expense>[] = Object.entries(response.data)

  return expensesData.map(([id, expense]) => ({
    id,
    amount: expense.amount,
    date: new Date(expense.date),
    description: expense.description,
  }))
}

export const updateExpense = async (id: string, expenseData: Omit<Expense, 'id'>) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export const deleteExpense = async (id: string) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}
