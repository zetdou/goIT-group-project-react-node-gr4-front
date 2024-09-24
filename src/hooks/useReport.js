import { useSelector } from "react-redux";
import { incomes, expenses } from "../redux/Report/ReportSelectors";

const useReport = (currentView) => {
    const incomesReport = useSelector(incomes);
    const expensesReport = useSelector(expenses);

    const data = currentView === "expenses" ? expensesReport : incomesReport;

    return data
}

export default useReport;