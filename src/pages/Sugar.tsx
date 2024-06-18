import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import mockData from '../../MOCK_DATA/mock-data.json';

import { Item } from '../components/Item';
import { AddNewDataButton } from '../components/AddNewDataButton';
import { addNewData } from '../utils/addNewData';

export interface SugarData {
  id: string;
  sugar: string;
  fullDate: number;
}

export const Sugar = () => {
  const [sugarData, setSugarData] = useState<SugarData[]>(mockData['sugar']);

  const handleAddNewData = (newItem: Partial<SugarData>) => {
    addNewData(newItem, setSugarData);
  };

  const sortedSugarData = [...sugarData].sort((a, b) => b.fullDate - a.fullDate);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sortedSugarData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} value={item.sugar} name="Sugar" />}
        contentContainerStyle={styles.list}
      />
      <AddNewDataButton<SugarData>
        addNewItem={handleAddNewData}
        itemName="Sugar"
        fields={[
          { label: 'Sugar', placeholder: 'Sugar', key: 'sugar' },
          { label: 'Date', placeholder: 'Date (DD/MM/YYYY HH:MM)', key: 'fullDate' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
});
