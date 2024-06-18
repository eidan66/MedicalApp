// components/AddItemModal.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface AddItemModalProps<T> {
  isModalVisible: boolean;
  toggleModal: () => void;
  addNewItem: (newItem: T) => void;
  itemName: string;
  fields: { label: string; placeholder: string; defaultDate?: string; key: keyof T }[];
}

export const AddItemModal = <T,>({
  isModalVisible,
  toggleModal,
  addNewItem,
  itemName,
  fields,
}: AddItemModalProps<T>) => {
  const [newItem, setNewItem] = useState<Partial<T>>({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key: keyof T, value: string | Date) => {
    setNewItem({ ...newItem, [key]: value });
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    console.log('idan -  handleDateChange  selectedDate:', selectedDate);

    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    handleChange('fullDate' as keyof T, currentDate);
  };

  const handleAdd = () => {
    //@ts-ignore - known issue - we know that fullDate it inside T
    if (!newItem?.fullDate) {
      addNewItem({ ...(newItem as T), fullDate: new Date() });
    } else {
      addNewItem(newItem as T);
    }

    setNewItem({});
    toggleModal();
  };

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Add New {itemName}</Text>
        {fields.map((field) => {
          if (field.key === 'fullDate') {
            return (
              <View key={field.key as string} style={styles.input}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                  <Text style={styles.datePickerButtonText}>{date ? date.toLocaleString() : field.placeholder}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker value={date} mode="datetime" display="default" onChange={handleDateChange} />
                )}
              </View>
            );
          }
          return (
            <TextInput
              key={field.key as string}
              style={styles.input}
              placeholder={field.placeholder}
              value={newItem[field.key] as string}
              onChangeText={(value) => handleChange(field.key, value)}
              //   defaultValue={field.defaultDate || ''}
            />
          );
        })}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAdd} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  datePickerButton: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
