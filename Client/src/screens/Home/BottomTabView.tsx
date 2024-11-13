import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { act, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Activity,
  DiscountShape,
  Home2,
  Message2,
  Setting2,
  TaskSquare,
} from 'iconsax-react-native';

import { colors } from '../../assets/styles/Colors';

import SettingsScreen from './Tabs/SettingsScreen';

import { BottomTabNavigationParams } from '../../types/commonNavigationParams.ts';

const Tab = createBottomTabNavigator<BottomTabNavigationParams>();

const BottomTabView: React.FC = () => {
  const [roleID, setRoleID] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoleID = async () => {
      const role = await AsyncStorage.getItem('role_id');
      setRoleID(role);
    };
    fetchRoleID();
  }, []);

  const tabBarOptions = {
    tabBarActiveTintColor: colors.PRIMARY_WHITE,
    tabBarInactiveTintColor: colors.LIGHT_GRAY,
    keyboardHidesTabBar: true,
    tabBarShowLabel: true,
    tabBarStyle: {
      backgroundColor: colors.PRIMARY_COLOR,
      shadowColor: 'transparent',
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
      height: 70,
      paddingBottom: 10,
      paddingTop: 10,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      marginTop: 5,
      activeTintColor: colors.PRIMARY_WHITE,
      inactiveTintColor: colors.LIGHT_GRAY,
    },
    tabBarIconStyle: {
      width: 20,
      height: 20,
    },
    headerShadowVisible: false,
    tabBarItemStyle: {
      paddingVertical: 10,
    },
  };

  const renderPosterTabs = () => (
    <>
    
   
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Setting2
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={30}
            />
          ),
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </>
  );

  const renderTaskerTabs = () => (
    <> 
    
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Setting2
              color={color}
              variant={focused ? 'Bold' : 'Linear'}
              size={30}
            />
          ),
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </>
  );

  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      {roleID === '1' ? renderPosterTabs() : renderTaskerTabs()}
    </Tab.Navigator>
  );
};

export default BottomTabView;
