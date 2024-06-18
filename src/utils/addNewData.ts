export const addNewData = <T>(newItem: Partial<T>, setData: React.Dispatch<React.SetStateAction<T[]>>) => {
  if (newItem) {
    const newEntry = {
      id: `${Math.random()}`,
      ...newItem,
    } as T;
    setData((prevData) => [newEntry, ...prevData]);
  } else {
    console.error('Invalid new item data:', newItem);
  }
};
