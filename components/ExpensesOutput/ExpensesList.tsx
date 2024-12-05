import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
} from "react-native";
import React from "react";
import { Expense, Expenses } from "../../constants/dummy_expenses";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: Expenses;
};

function renderExpensesItem(itemData: ListRenderItemInfo<Expense>) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }: Props) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensesItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
