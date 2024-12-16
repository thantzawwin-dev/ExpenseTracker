import { Expense } from '@/constants/dummy_expenses'
import { createContext, useState, PropsWithChildren, useReducer } from 'react'

type ContextValueProps = {
  expenses: State
  addExpense: (expenseData: Expense) => void
  setExpenses: (expenses: State) => void
  deleteExpense: (id: string) => void
  updateExpense: (id: string, expenseData: Omit<Expense, 'id'>) => void
}

export const ExpensesContext = createContext<ContextValueProps>({
  expenses: [],
  addExpense: function () {
    throw new Error('addExpense Function not implemented.')
  },
  setExpenses: function () {
    throw new Error('setExpenses Function not implemented.')
  },
  deleteExpense: function () {
    throw new Error('deleteExpense Function not implemented.')
  },
  updateExpense: function () {
    throw new Error('updateExpense Function not implemented.')
  },
})

// 1. Define state type
type State = Expense[]

// 2. Define action types
type Action =
  | { type: 'ADD'; payload?: Expense }
  | { type: 'SET'; payload: State }
  | { type: 'UPDATE'; payload: { id: string; data: Omit<Expense, 'id'> } }
  | { type: 'DELETE'; payload: string }

function expensesReducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD':
      return action.payload ? [action.payload, ...state] : state
    case 'SET':
      const inverted = action.payload.reverse()
      return inverted
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload?.id)
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload?.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

// 3. Initial state
const initialState: State = []

type Props = PropsWithChildren & {}

function ExpensesContextProvider({ children }: Props) {
  // const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState)

  function addExpense(expenseData: Expense) {
    dispatch({ type: 'ADD', payload: expenseData })
  }
  function setExpenses(expenses: State) {
    dispatch({ type: 'SET', payload: expenses })
  }
  function deleteExpense(id: string) {
    dispatch({ type: 'DELETE', payload: id })
  }
  function updateExpense(id: string, expenseData: Omit<Expense, 'id'>) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider
