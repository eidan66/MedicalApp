import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';

interface Item {
  name: string;
  value: string;
  fullDate: Date | number | string;
  id: string;
}

export const Item: FunctionComponent<Item> = ({ fullDate, name, value }) => (
  // @ts-ignore - verify type problem here later :)
  <Card containerStyle={styles.card}>
    <View style={styles.cardContent}>
      <Card.Title style={styles.sturgeonText}>
        {name}: {value}
      </Card.Title>
      <Text style={styles.dateText}>Date: {moment(fullDate).format('DD/MM/YYYY HH:MM')}</Text>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    borderRadius: 8,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  sturgeonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: 'grey',
  },
});
