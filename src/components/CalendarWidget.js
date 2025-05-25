import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useStore } from '../store/useStore';
import { theme } from '../theme';
import { getUpcomingEvents } from '../services/api';

// Helper to generate days of the week
const getDaysOfWeek = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Return the next 7 days starting with today
  return [...Array(7)].map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    return {
      day: days[(dayOfWeek + i) % 7],
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isToday: i === 0,
    };
  });
};

const CalendarWidget = ({ onEventPress, style }) => {
  const { themeMode, user } = useStore();
  const [selectedDay, setSelectedDay] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const days = getDaysOfWeek();
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const selectedDate = new Date();
        selectedDate.setDate(selectedDate.getDate() + selectedDay);
        
        const eventsData = await getUpcomingEvents(user.id, selectedDate);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, [selectedDay, user.id]);
  
  const handleDayPress = (index) => {
    setSelectedDay(index);
  };
  
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 600 }}
      style={[styles.container, style, { backgroundColor: theme[themeMode].cardBackground }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme[themeMode].text }]}>Upcoming Schedule</Text>
        <TouchableOpacity>
          <Feather name="calendar" size={20} color={theme[themeMode].textSecondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayItem,
              selectedDay === index && {
                backgroundColor: theme[themeMode].accent,
                borderColor: theme[themeMode].accentLight
              }
            ]}
            onPress={() => handleDayPress(index)}
          >
            <Text 
              style={[
                styles.dayText,
                { color: selectedDay === index ? '#fff' : theme[themeMode].text }
              ]}
            >
              {day.day}
            </Text>
            <Text 
              style={[
                styles.dateText,
                { color: selectedDay === index ? '#fff' : theme[themeMode].text },
                day.isToday && styles.todayText
              ]}
            >
              {day.date}
            </Text>
            {day.isToday && <View style={styles.todayDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.eventsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: theme[themeMode].textSecondary }]}>
              Loading events...
            </Text>
          </View>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <MotiView
              key={event.id}
              from={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: index * 100, type: 'timing', duration: 400 }}
            >
              <TouchableOpacity
                style={[
                  styles.eventItem,
                  { backgroundColor: theme[themeMode].backgroundLight }
                ]}
                onPress={() => onEventPress && onEventPress(event)}
              >
                <View style={[styles.eventTimeContainer, { backgroundColor: theme[themeMode].accent }]}>
                  <Text style={styles.eventTimeText}>{event.time}</Text>
                </View>
                
                <View style={styles.eventDetails}>
                  <Text style={[styles.eventTitle, { color: theme[themeMode].text }]}>
                    {event.title}
                  </Text>
                  
                  <View style={styles.eventMeta}>
                    {event.type && (
                      <View style={styles.eventType}>
                        <Feather 
                          name={
                            event.type === 'lesson' ? 'book-open' :
                            event.type === 'quiz' ? 'help-circle' :
                            event.type === 'deadline' ? 'alert-circle' : 'calendar'
                          } 
                          size={12} 
                          color={theme[themeMode].textSecondary} 
                        />
                        <Text style={[styles.eventTypeText, { color: theme[themeMode].textSecondary }]}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Text>
                      </View>
                    )}
                    
                    {event.duration && (
                      <View style={styles.eventDuration}>
                        <Feather name="clock" size={12} color={theme[themeMode].textSecondary} />
                        <Text style={[styles.eventDurationText, { color: theme[themeMode].textSecondary }]}>
                          {event.duration}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                
                <Feather 
                  name="chevron-right" 
                  size={20} 
                  color={theme[themeMode].textSecondary} 
                />
              </TouchableOpacity>
            </MotiView>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Feather name="calendar" size={30} color={theme[themeMode].textSecondary} />
            <Text style={[styles.emptyText, { color: theme[themeMode].textSecondary }]}>
              No events scheduled for this day
            </Text>
          </View>
        )}
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  daysContainer: {
    paddingBottom: 16,
  },
  dayItem: {
    width: 50,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dayText: {
    fontSize: 12,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todayText: {
    fontWeight: 'bold',
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF5252',
    position: 'absolute',
    bottom: 10,
  },
  eventsContainer: {
    marginTop: 8,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  eventTimeContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventTimeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  eventTypeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  eventDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDurationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 14,
  },
});

export default CalendarWidget;
