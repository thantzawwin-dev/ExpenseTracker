import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

type Props = {};

const RecentExpense = (props: Props) => {
  return <ExpensesOutput expensesPeriod="Last 7 Days" />;
};

export default RecentExpense;

const styles = StyleSheet.create({});
