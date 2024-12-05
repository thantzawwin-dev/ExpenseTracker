import { FlatList, StyleSheet, Text, View } from "react-native";
import DUMMY_EXPENSES, { Expenses } from "../../constants/dummy_expenses";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  expensesPeriod: string;
};

const ExpensesOutput = ({ expensesPeriod }: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
});
