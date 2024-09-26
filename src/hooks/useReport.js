import { useSelector } from "react-redux";
import { incomes, expenses } from "../redux/Report/ReportSelectors";
import { useMemo } from "react";

const useReport = (currentView) => {
    const incomesReport = useSelector(incomes);
    const expensesReport = useSelector(expenses);

    const data = useMemo(() => {
        return currentView === "expenses" ? expensesReport : incomesReport;
    }, [currentView, incomesReport, expensesReport]); 

    return data
}

export default useReport;