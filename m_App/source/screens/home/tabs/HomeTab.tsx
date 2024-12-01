import { Location, Map1, Notification, Setting2 } from 'iconsax-react-native';
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CustomAdCard from '../../../components/cards/CustomAdCard.Home';
import HorizontalCard from '../../../components/cards/HorizontalCard';
import CustomChip from '../../../components/CustomChip';
import CustomSearchBar from '../../../components/CustomSearchBar';
import { AppDimensions, logo } from '../../../helpers/AppSettings';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { TravelPartnerRequests } from '../../../interface/ICard';
import { RootState } from '../../../redux/Store';
import { ScreenStyles } from '../../../styles/AppStyles';
import Typography from '../../../styles/Typography';
import { CustomThemeType } from '../../../themes/theme';
import GoogleSigninUtils from '../../../utils/GoogleSignin';
import { useNavigation } from '@react-navigation/native';

//MARK: - Interfaces
interface BannerItem {
  id: string;
  title: string;
  image: string;
  location: string;
}

const defaultBannerItems: BannerItem[] = [
  {
    id: '1',
    title: 'Taking a boat tour through the canals of Colombo',
    image: 'https://clevenard.com/uploads/b/l/n/m/yzahdtb7artwddnoixkj.jpg',
    location: 'Colombo, Sri Lanka',
  },
  {
    id: '2',
    title: 'Galle Face Green',
    image:
      'https://i0.wp.com/atlas.tennis/wp-content/uploads/2023/12/Sunshine-And-Smiles-Trip.jpg?w=720&ssl=1',
    location: 'Colombo, Sri Lanka',
  },
  {
    id: '3',
    title: 'Gangaramaya Temple',
    image:
      'https://i0.wp.com/whatlauradidnext.com/wp-content/uploads/2023/08/pexels-adrien-olichon-3884483.jpg?resize=1440%2C960&ssl=1',
    location: 'Colombo, Sri Lanka',
  },
];
const mockData: TravelPartnerRequests[] = [
  {
    id: '1',
    userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    title: 'Looking for a travel partner!',
    routeDetails: 'Sydney → Melbourne → Brisbane',
    comments: 0,
    likes: 0,
    shares: 0,
    timeAgo: '1 hour ago',
  },
  {
    id: '2',
    userImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Smith',
    title: 'Adventure trip ahead!',
    routeDetails: 'Paris → Rome → Venice',
    comments: 0,
    likes: 0,
    shares: 0,
    timeAgo: '1 hour ago',
  },
  {
    id: '3',
    userImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'James Bond',
    title: 'Traveling to the mountains!',
    routeDetails: 'Switzerland → Austria → Germany',
    comments: 0,
    likes: 0,
    shares: 0,
    timeAgo: '1 hour ago',
  },
  {
    id: '4',
    userImage: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Emma Watson',
    title: 'Looking for a travel partner!',
    routeDetails: 'London → Edinburgh → Dublin',
    comments: 0,
    likes: 0,
    shares: 0,
    timeAgo: '1 hour ago',
  },
];

const HomeTab = () => {
  //MARK: - Hooks
  const {colors} = useAppTheme();
  const styles = makeStyles(colors);
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();  
  //MARK: - State
  const [loadedBannerItems, setLoadedBannerItems] =
    React.useState<BannerItem[]>(defaultBannerItems);
  const [searchQuery, setSearchQuery] = React.useState('');

  //MARK: - Functions
  function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  

  //MARK: - Components

  const TopHeaderView: React.FC = () => {
    return (
      <View style={[styles.topHeaderContainer]}>
        <View style={[styles.iconContainer]}>
          <Image source={logo()} style={[styles.logo]} />
          <View style={{flexGrow: 1}} />
          <TouchableOpacity>
            <Notification color={colors.PrimaryText} size={26} variant="Bold" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await GoogleSigninUtils.signOut();
              console.log('User signed out successfully');
            }}>
            <Setting2 color={colors.PrimaryText} size={26} variant="Bold" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const GreetingView: React.FC = () => {
    return (
      <Text style={[Typography.h2Regular, {color: colors.SecondaryText}]}>
        {getGreeting()}
      </Text>
    );
  };

  const NameView: React.FC = () => {
    return (
      <>
        <Text style={[Typography.h1Bold, {color: colors.PrimaryText}]}>
          {user.displayName}
        </Text>
        <View style={[styles.locationDetailContainer]}>
          <Location color={colors.highlightText} size={12} variant="Bold" />
          <Text
            style={[Typography.bodySmallBold, {color: colors.highlightText}]}>
            Colombo, Sri Lanka
          </Text>
        </View>
      </>
    );
  };

  const MainPlacesChips: React.FC = () => {
    return (
      <ScrollView
        contentContainerStyle={[styles.chipsContainer]}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <CustomChip text="All" selected />
        <CustomChip text="Museums" />
        <CustomChip text="Historical places" />
        <CustomChip text="Restaurants" />
        <CustomChip text="Parks" />
        <CustomChip text="Hotels" />
      </ScrollView>
    );
  };

  const BannerImagesView: React.FC = () => {
    return (
      <ScrollView
        contentContainerStyle={[styles.bannerItemsContainer]}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {loadedBannerItems.map((item, index) => {
          return <ImageComponent key={index} {...item} />;
        })}
      </ScrollView>
    );
  };

  const ImageComponent: React.FC<BannerItem> = ({
    title,
    image,
    location,
    id,
  }) => {
    return (
      <ImageBackground
        imageStyle={styles.bannerItemImage}
        style={styles.bannerItemBackground}
        source={{uri: image}}>
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <View style={[styles.bannerItemLocationContainer]}>
            <Map1 color="white" size={16} variant="Bold" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.bannerItemTitle}>
            {title}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  const TravelPartners: React.FC = () => {
    const renderCard = (
      {item}: {item: TravelPartnerRequests},
      index: number,
    ) => (
      <HorizontalCard
        userImage={item?.userImage}
        name={item?.name}
        title={item?.title}
        routeDetails={item?.routeDetails}
        onPress={() => {
          Alert.alert('Card Pressed');
        }}
        comments={item?.comments}
        likes={item?.likes}
        shares={item?.shares}
        timeAgo={item?.timeAgo}
        id={item?.id}
        key={index}
      />
    );

    return (
      <View style={[styles.travelCardsContainer]}>
        <Text style={styles.HomeTitleText}>
          Hurry up! Find your travel partner.
        </Text>
        {mockData.length > 0 &&
          mockData.map((item, index) => renderCard({item}, index))}
      </View>
    );

    
  };

  //MARK: - Render
  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <TopHeaderView />
        <View style={[ScreenStyles.subContainer]}>
          <GreetingView />
          <NameView />
        </View>
        {/* MARK: - Search Bar */}
        <View style={[styles.HorizontalPadding]}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('UserPreferences')}>
            <Text style={styles.buttonText}>Go to Preferences</Text>
          </TouchableOpacity>

          <Text style={styles.HomeTitleText}>
            Search for places to visit 🌍.
          </Text>
          <CustomSearchBar
            placeholder="Search for places"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </View>
        <MainPlacesChips />
        <BannerImagesView />
        <CustomAdCard
          title="Find kindred spirits, create bonds, and explore the world together!"
          subtitle="Wander Think"
          onPressLearnMore={() => console.log('Learn More Pressed')}
        />
        <TravelPartners />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;

const makeStyles = (colors: CustomThemeType['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BG_COLOR,
    },
    topHeaderContainer: {
      paddingTop: 16,
      paddingHorizontal: 12,
    },
    logo: {
      width: 180,
      height: 60,
      resizeMode: 'contain',
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 8,
    },
    locationDetailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 4,
      paddingVertical: 4,
    },
    chipsContainer: {
      gap: 8,
      paddingHorizontal: 12,
    },
    bannerItemsContainer: {
      gap: 12,
      paddingVertical: 16,
      paddingHorizontal: 12,
    },
    bannerItemBackground: {
      width: AppDimensions.width - 32,
      height: 213,
      justifyContent: 'flex-end',
      borderRadius: 16,
      overflow: 'hidden',
    },
    bannerItemImage: {
      borderRadius: 16,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    contentContainer: {
      padding: 12,
    },
    locationText: {
      ...Typography.bodySmallBold,
      color: 'white',
    },
    bannerItemTitle: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      padding: 8,
      borderRadius: 8,
    },
    bannerItemLocationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 6,
      paddingHorizontal: 8,
      backgroundColor: colors.CommonBackground,
      alignSelf: 'flex-start',
      borderRadius: 8,
    },
    travelCardsContainer: {
      padding: 12,
      gap: 16,
    },
    HomeTitleText: {
      ...Typography.bodyDefaultBold,
      color: colors.PrimaryText,
    },
    HorizontalPadding: {
      paddingHorizontal: 12,
      gap: 8,
      marginBottom: 16,
    },
  });
