const listSorter = (criteria, ascendingOrder, list) => {
  const sortedList = [...list].sort((a, b) => {
    if (a[criteria] < b[criteria]) return ascendingOrder ? -1 : 1;
    if (a[criteria] > b[criteria]) return ascendingOrder ? 1 : -1;
    return 0;
  });

  return sortedList;
};

export default listSorter;
