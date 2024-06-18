import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Route } from './src/routes/types/Route';
import { Sturgeon } from './src/pages/Sturgeon';
import { Blood } from './src/pages/Blood';
import { Sugar } from './src/pages/Sugar';

const Tabs = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case Route.Sturgeon:
                return <MaterialIcons name={'air'} size={size} color={color} />;
              case Route.Sugar:
                return <MaterialCommunityIcons name={'spoon-sugar'} size={size} color={focused ? 'brown' : color} />;
              case Route.Blood:
                return <MaterialIcons name={'bloodtype'} size={size} color={focused ? 'red' : color} />;
              default:
            }
          },
        })}
      >
        <Tabs.Screen name={Route.Sturgeon} key={Route.Sturgeon} component={Sturgeon} />
        <Tabs.Screen name={Route.Blood} key={Route.Blood} component={Blood} />
        <Tabs.Screen name={Route.Sugar} key={Route.Sugar} component={Sugar} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default App;
