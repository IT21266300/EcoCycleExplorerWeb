import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Dimensions } from 'react-native';
import { Home2, Profile, AddCircle, Location, Star1 } from 'iconsax-react-native';
import { colors } from '../../assets/styles/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

type TourCard = {
  id: string;
  title: string;
  location: string;
  rating: number;
  image: ImageSourcePropType;
  distance: string;
}

const tourData: TourCard[] = [
  {
    id: '1',
    title: 'Coastal Beach Ride',
    location: 'Galle Coast',
    rating: 4.8,
    image: require('../../assets/images/tour1.png'),
    distance: '12 km'
  },
  {
    id: '2',
    title: 'Mountain Trail',
    location: 'Nuwara Eliya',
    rating: 4.9,
    image: require('../../assets/images/tour2.png'),
    distance: '8 km'
  },
  {
    id: '2',
    title: 'Nine Arch Bridge',
    location: 'Ella',
    rating: 4.9,
    image: require('../../assets/images/tour3.png'),
    distance: '8 km'
  }
];

type RootStackParamList = {
  MainHome: undefined;
  HomeScreen: undefined;
  RideTracking: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainHome'>;

interface Props {
  navigation: NavigationProp;
}

const TourCard = ({ tour }: { tour: TourCard }) => (
  <TouchableOpacity style={styles.tourCard}>
    <Image source={tour.image} style={styles.tourImage} />
    <View style={styles.tourInfo}>
      <Text style={styles.tourTitle}>{tour.title}</Text>
      <View style={styles.locationContainer}>
        <Location size={16} color={colors.PRIMARY_COLOR} />
        <Text style={styles.locationText}>{tour.location}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Star1 size={16} color="#FFD700" variant="Bold" />
        <Text style={styles.ratingText}>{tour.rating}</Text>
        <Text style={styles.distanceText}>{tour.distance}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MainHome = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
          style={styles.headerGradient}
        >
          <Text style={styles.welcomeText}>Discover</Text>
          <Text style={styles.subText}>Beautiful bicycle routes</Text>
        </LinearGradient>
      </View>

      {/* Horizontal Scroll Tours */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tourData.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </ScrollView>

      {/* Popular Routes Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular Routes</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Add route items here */}
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('MainHome')}>
          <Home2 size={28} color={colors.PRIMARY_COLOR} />
        </TouchableOpacity>

        <TouchableOpacity 
  style={styles.addButton}
  onPress={() => navigation.navigate('RideTracking')}>
  <AddCircle size={48} color={colors.PRIMARY_COLOR} variant="Bold" />
</TouchableOpacity>


        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Profile size={28} color={colors.PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_WHITE,
  },
  header: {
    height: 110,
    marginBottom: 20,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.PRIMARY_WHITE,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  subText: {
    fontSize: 18,
    color: colors.PRIMARY_WHITE,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.9,
  },
  scrollContent: {
    padding: 20,
  },
  tourCard: {
    width: width * 0.7,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: colors.PRIMARY_WHITE,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tourImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tourInfo: {
    padding: 15,
  },
  tourTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.PRIMARY_BLACK,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    marginLeft: 5,
    color: colors.PRIMARY_GRAY,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 5,
    color: colors.PRIMARY_BLACK,
    fontWeight: 'bold',
  },
  distanceText: {
    marginLeft: 'auto',
    color: colors.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  sectionContainer: {
    padding: 50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.PRIMARY_BLACK,
    marginBottom: 15,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.PRIMARY_WHITE,
    borderTopWidth: 1,
    borderTopColor: '#EBEBF5',
  },
  iconButton: {
    padding: 12,
  },
  addButton: {
    marginBottom: 20,
  }
});

export default MainHome;
