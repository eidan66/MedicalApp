import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { AddItemModal } from './AddItemModal';

interface AddNewDataButtonProps<T> {
  addNewItem: (newItem: Partial<T>) => void;
  itemName: string;
  fields: { label: string; placeholder: string; defaultDate?: string; key: keyof T }[];
}

export const AddNewDataButton = <T,>({ addNewItem, itemName, fields }: AddNewDataButtonProps<T>) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Button title={`Add New ${itemName}`} onPress={toggleModal} />
      <AddItemModal<T>
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        addNewItem={addNewItem}
        itemName={itemName}
        fields={fields}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
