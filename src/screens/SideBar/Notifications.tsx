import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { HeaderWrapper } from '../../components/HeaderWrappers/HeaderWrapper';
import { Text } from '../../components/Text';
import { BLACK_TEXT, PLACEHOLDER_COLOR } from '../../assets/colors';

interface NotificationItem {
  id: string;
  text: string;
  timestamp: string;
  category: string;
}

const Notifications = () => {
  const dummyNotifications = [
    { id: '1', text: 'John just joined your trip ', timestamp: 'now', category: 'today' },
    { id: '2', text: 'Trip joining pending ', timestamp: '2h', category: 'today' },
    { id: '3', text: 'Notification 3', timestamp: '2 days ago', category: 'today' },
    { id: '4', text: 'Notification 4', timestamp: '3 days ago', category: 'last7days' },
    { id: '5', text: 'Notification 5', timestamp: '5 days ago', category: 'last7days' },
    { id: '6', text: 'Notification 6', timestamp: '10 days ago', category: 'last30days' },
  ];

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <View style={styles.notificationItem}>
      <Text variant="heading" style={styles.bullet}>
        {'\u2022'}
      </Text>
      <Text style={styles.notificationText}>{item.text}</Text>
      <Text style={styles.timestamp} color={PLACEHOLDER_COLOR}>
        {item.timestamp}
      </Text>
    </View>
  );

  const renderNotificationCategory = (category:any, title:any) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.todayHeading}>{title}</Text>
      <FlatList
        data={dummyNotifications.filter((item) => item.category === category)}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
      />
    </View>
  );

  return (
    <HeaderWrapper>
      <View style={styles.container}>
        <Text style={styles.notificationsHeading}>Notifications</Text>
        {renderNotificationCategory('today', 'Today')}
        {renderNotificationCategory('last7days', 'Last 7 days')}
        {renderNotificationCategory('last30days', 'Last 30 days')}
      </View>
    </HeaderWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  notificationsHeading: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 30,
  },
  notificationContainer: {
    marginBottom: 30,
  },
  todayHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  notificationItem: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    marginRight: 8,
    color: BLACK_TEXT,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
  },
  timestamp: {
    fontSize: 14,
  },
});

export default Notifications;
