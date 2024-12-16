import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";

type Props = {};

const AllExpenses = (props: Props) => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx?.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
