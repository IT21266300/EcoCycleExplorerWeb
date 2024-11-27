import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';

const UserPreferencesScreen = () => {
  const [age, setAge] = useState('');
  const [difficulty, setDifficulty] = useState('1'); // Default: Easy
  const [visitTime, setVisitTime] = useState('');
  const [activities, setActivities] = useState({
    cultural: false,
    nature: false,
    historical: false,
    religious: false,
    festive: false,
  });

  const handleSubmit = () => {
    const selectedActivities = Object.keys(activities).filter((key) => activities[key as keyof typeof activities]);
    if (!age || !visitTime || selectedActivities.length === 0) {
      Alert.alert('Error', 'Please fill all the fields and select at least one activity.');
      return;
    }

    const userData = {
      age,
      difficulty,
      visitTime,
      preferredActivities: selectedActivities,
    };

    Alert.alert('Submitted', `Your preferences: ${JSON.stringify(userData, null, 2)}`);
    // You can now send `userData` to your backend or save it in state!
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tell Us About Your Preferences</Text>

      {/* Age Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      {/* Difficulty Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Preferred Difficulty Level</Text>
        <Picker
          selectedValue={difficulty}
          onValueChange={(value) => setDifficulty(value)}
          style={styles.picker}
        >
          <Picker.Item label="Easy" value="1" />
          <Picker.Item label="Medium" value="2" />
          <Picker.Item label="Hard" value="3" />
        </Picker>
      </View>

      {/* Planned Visit Time */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Plan to Visit Sri Lanka In</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., December 2024"
          value={visitTime}
          onChangeText={setVisitTime}
        />
      </View>

      {/* Activities Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Preferred Activities</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={activities.cultural ? 'checked' : 'unchecked'}
            onPress={() => setActivities({ ...activities, cultural: !activities.cultural })}
          />
          <Text style={styles.checkboxLabel}>Cultural, Parade</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={activities.nature ? 'checked' : 'unchecked'}
            onPress={() => setActivities({ ...activities, nature: !activities.nature })}
          />
          <Text style={styles.checkboxLabel}>Nature, Trekking</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={activities.historical ? 'checked' : 'unchecked'}
            onPress={() => setActivities({ ...activities, historical: !activities.historical })}
          />
          <Text style={styles.checkboxLabel}>Historical, Literature</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={activities.religious ? 'checked' : 'unchecked'}
            onPress={() => setActivities({ ...activities, religious: !activities.religious })}
          />
          <Text style={styles.checkboxLabel}>Religious, Historical</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={activities.festive ? 'checked' : 'unchecked'}
            onPress={() => setActivities({ ...activities, festive: !activities.festive })}
          />
          <Text style={styles.checkboxLabel}>Festive, Nature</Text>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserPreferencesScreen;
