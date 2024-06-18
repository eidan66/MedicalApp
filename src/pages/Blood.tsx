import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import mockData from '../../MOCK_DATA/mock-data.json';

import { Item } from '../components/Item';
import { AddNewDataButton } from '../components/AddNewDataButton';
import { addNewData } from '../utils/addNewData';

export interface BloodData {
  id: string;
  blood: string;
  fullDate: number;
}

export const Blood = () => {
  const [bloodData, setBloodData] = useState<BloodData[]>(mockData['blood']);

  const handleAddNewData = (newItem: Partial<BloodData>) => {
    addNewData(newItem, setBloodData);
  };

  const sortedBloodData = [...bloodData].sort((a, b) => b.fullDate - a.fullDate);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sortedBloodData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} value={item.blood} name="Blood" />}
        contentContainerStyle={styles.list}
      />
      <AddNewDataButton<BloodData>
        addNewItem={handleAddNewData}
        itemName="Blood"
        fields={[
          { label: 'Blood', placeholder: 'Blood', key: 'blood' },
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
