import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const notifications = [
  {
    id: '1',
    name: 'Mathew D.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '24 hours ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '2',
    name: 'Bilek B.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '4 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '3',
    name: 'Eddy D.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '4 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '4',
    name: 'Erik R.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '4 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '5',
    name: 'Dinh P.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '4 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '6',
    name: 'Ray H.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '4 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '7',
    name: 'Huji M.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '4 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '8',
    name: 'Joe Kevin S.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '4 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '9',
    name: 'Mathew D.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '5 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    id: '10',
    name: 'Mathew D.',
    message: 'has made an offer on',
    task: 'Gaslighting bed assembly',
    time: '6 days ago',
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
];

const NotificationScreen = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.notificationItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          {item.name} <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.taskText}> {item.task}</Text>
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageText: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#666',
  },
  taskText: {
    color: '#3498db',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default NotificationScreen;
