import { useState } from "react";

export default function useAscendingOrder() {
  const [currentCriteria, setCurrentCriteria] = useState("aisleName");
  const [ascendingOrder, setAscendingOrder] = useState("true");

  const sendCriteria = (criteria) => {
    if (criteria === currentCriteria) {
      setAscendingOrder((prev) => !prev);
    } else {
      setCurrentCriteria(criteria);
      setAscendingOrder(true);
    }
  };

  return [ascendingOrder, currentCriteria, sendCriteria];
}
