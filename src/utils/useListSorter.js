import { useState } from "react";

const [currentCriteria, setCurrentCriteria] = useState("name");
const [ascendingOrder, setAscendingOrder] = useState("true");

const useListSorter = (criteria, list) => {
  if (criteria === currentCriteria) {
    setAscendingOrder(!ascendingOrder);
  } else {
    setCurrentCriteria(criteria);
    setAscendingOrder(true);
  }

  const sortedList = [...list].sort((a, b) => {
    if (a[criteria] < b[criteria]) return ascendingOrder ? -1 : 1;
    if (a[criteria] > b[criteria]) return ascendingOrder ? 1 : -1;
    return 0;
  });

  return sortedList;
};

export default useListSorter;
