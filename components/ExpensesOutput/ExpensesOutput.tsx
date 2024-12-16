import { FlatList, StyleSheet, Text, View } from "react-native";
import { Expenses } from "../../constants/dummy_expenses";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  expenses: Expenses;
  expensesPeriod: string;
  fallbackText: string;
};

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }: Props) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    // borderRadius: 6,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
