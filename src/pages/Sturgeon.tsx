import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import mockData from '../../MOCK_DATA/mock-data.json';

import { Item } from '../components/Item';
import { AddNewDataButton } from '../components/AddNewDataButton';
import { addNewData } from '../utils/addNewData';

export interface SturgeonData {
  id: string;
  sturgeon: string;
  fullDate: number;
}

export const Sturgeon = () => {
  const [sturgeonData, setSturgeonData] = useState<SturgeonData[]>(mockData['sturgeon']);

  const handleAddNewData = (newItem: Partial<SturgeonData>) => {
    addNewData(newItem, setSturgeonData);
  };

  const sortedSturgeonData = [...sturgeonData].sort((a, b) => b.fullDate - a.fullDate);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sortedSturgeonData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} value={item.sturgeon} name="Sturgeon" />}
        contentContainerStyle={styles.list}
      />
      <AddNewDataButton<SturgeonData>
        addNewItem={handleAddNewData}
        itemName="Sturgeon"
        fields={[
          { label: 'Sturgeon', placeholder: 'Sturgeon', key: 'sturgeon' },
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
