import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import {
  ArrowRight2,
  Bag2,
  Bank,
  DocumentText,
  Edit,
  Eye,
  InfoCircle,
  Location,
  LocationAdd,
  Lock,
  Logout,
  MoneySend,
  ReceiptSearch,
  Scroll,
  Star1,
  User,
} from 'iconsax-react-native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {
  ScreenStyles,
  SpaceStyles,
  TextStyles,
} from '../../../assets/styles/AppStyles';
import { colors } from '../../../assets/styles/Colors';
import APIClient from '../../../helpers/APIClient.tsx';
import { APIEndpoint } from '../../../helpers/APIEndpoints.tsx';
import { Switch } from 'react-native-switch';

const SettingsScreen = ({ navigation }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [switchState, setSwitchState] = useState<boolean>();
  const [rating, setRating] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<any>();
  const [jobCount, setJobCount] = useState(0);
  const [isOnline, setIsOnline] = useState<boolean>(false);

  // MARK: - Use Focus Effect
  useFocusEffect(
    useCallback(() => {
      checkRoleState();
      userInfoNetworkRequest();
      checkVerificationStatus();
    }, []),
  );

  // MARK: - Network Request
  async function checkVerificationStatus() {
    APIClient.sendRequest('GET', APIEndpoint.CheckOnlineStatus)
      .then(async response => {
        if (response.ok) {
          return response.json();
        } else {
          let result = await response.json();
          console.log('🔴 Error: ', result);
        }
      })
      .then(result => {
        if (result) {
          console.log('🟢 Online Status: ', result);
          if (result?.STATUS == 'Online') {
            setIsOnline(true);
          } else if (result?.STATUS == 'Offline') {
            setIsOnline(false);
          }
        }
      })
      .catch(err => {
        console.log('🔴 Error: ', err);
      });
  }

  function CheckVerifiedStatus() {
    APIClient.sendRequest('GET', APIEndpoint.VerificationStatus)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setVerificationStatus(result.status);
          console.log('🟢 Verification Status: ', result.status);
        }
      })
      .catch(err => {
        console.log('🔴 Error: ', err);
      });
  }

  function getPosterJobCount() {
    APIClient.sendRequest('GET', APIEndpoint.PosterJobCount)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setJobCount(result.jobCount);
          console.log('🟢 Job Count: ', result.jobCount);
        }
      })
      .catch(err => {
        console.log('🔴 Error In Job Count: ', err);
      });
  }

  function changeRole() {
    Alert.alert('Alert', 'Do you want to switch Role?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        onPress: () => {
          APIClient.sendRequest('POST', APIEndpoint.ChangeRole)
            .then(response => response.json())
            .then(result => {
              if (result) {
                let resultData = JSON.stringify(result);

                setSwitchState(!switchState);
                AsyncStorage.setItem('role_id', switchState ? '2' : '1');
                checkRoleState();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Splash',
                    },
                  ],
                });
              } else {
                console.log('🔴 Role Change Error: ', result);
              }
            })
            .catch(err => {
              console.log('🔴 Error: ', err);
            });
        },
      },
    ]);
  }

  function userInfoNetworkRequest() {
    APIClient.sendRequest('GET', APIEndpoint.UserDetails)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setUserData(result);
        }
      })
      .catch(err => {
        console.log('🔴 Error: ', err);
      });
  }

  // MARK: - Functions
  async function checkRoleState() {
    try {
      let role_id = await AsyncStorage.getItem('role_id');
      if (role_id == '1') {
        setSwitchState(true);
        getPosterJobCount();
      } else {
        setSwitchState(false);
        CheckVerifiedStatus();
        // await checkVerificationStatus();
      }
      SwitchView();
    } catch (error) {
      console.error('Error retrieving role_id from AsyncStorage:', error);
    }
  }

  function navigateTo(rootName: string) {
    navigation.navigate(rootName);
  }

  function logoutAction() {
    Alert.alert('Confirm', 'Do You Want To Logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          AsyncStorage.removeItem('access_token');
          AsyncStorage.removeItem('role_id');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  }

  const toggleSwitch = () => {
    Alert.alert('Alert', 'Do you want to change your online status?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        onPress: () => {
          setIsOnline(previousState => !previousState);
          APIClient.sendRequest('POST', APIEndpoint.ChangeTaskerWorkStatus)
            .then(response => response.json())
            .then(result => {
              if (result) {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Splash',
                    },
                  ],
                });
              }
            })
            .catch(err => {
              console.log('🔴 Error: ', err);
            });
        },
      },
    ]);
  };

  const StatusSwitch = () => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 8,
            width: 'auto',
            marginTop: 6,
            paddingHorizontal: 16,
          },
        ]}>
        <Switch
          value={isOnline}
          onValueChange={toggleSwitch}
          disabled={false}
          circleSize={25}
          containerStyle={{
            paddingVertical: 15,
          }}
          switchWidthMultiplier={2.5}
          circleBorderWidth={3}
          circleBorderActiveColor={colors.PRIMARY_WHITE}
          circleBorderInactiveColor={colors.THEME_GRAY}
          backgroundActive={colors.SECONDARY_COLOR}
          backgroundInactive={colors.THEME_GRAY}
          circleActiveColor={colors.PRIMARY_WHITE}
          circleInActiveColor={colors.THEME_GRAY}
          changeValueImmediately={true}
          innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }}
          renderActiveText={true}
          renderInActiveText={true}
          switchBorderRadius={30}
          switchRightPx={2}
          switchLeftPx={2}
          activeText=""
          inActiveText=""
        />
        <Text
          style={[
            TextStyles.H4,
            {
              marginLeft: 8,
              fontWeight: 'bold',
              color: colors.PRIMARY_GRAY,
            },
          ]}>
          {isOnline ? `I'm Online` : `I'm Offline`}
        </Text>
      </View>
    );
  };

  // MARK: - Components

  const SwitchView = () => {
    return (
      <Pressable onPress={changeRole}>
        <View style={styles.switchContainer}>
          <View
            style={[
              switchState == true && styles.switchActive,
              {
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                gap: 0,
                margin: 0,
              },
            ]}>
            <Text
              style={[
                styles.switchText,
                { color: switchState == true ? '#FFF' : '#000' },
                { fontWeight: switchState == true ? 'bold' : 'normal' },
              ]}>
              Poster
            </Text>
          </View>
          <View
            style={[
              switchState == false && styles.switchActive,
              {
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                gap: 0,
                margin: 0,
              },
            ]}>
            <Text
              style={[
                styles.switchText,
                { color: switchState == false ? '#FFF' : '#000' },
                { fontWeight: switchState == false ? 'bold' : 'normal' },
              ]}>
              Tasker
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const TaskerDetailContainer = () => {
    return (
      <View style={[styles.detailItemCOntainer]}>
        <View style={[SpaceStyles.m4, styles.profileBoxContentContainer]}>
          <Star1 size="16" color={colors.PRIMARY_COLOR} variant="Bold" />
          <Text style={[styles.detailItemText]}>0 Ratings Received</Text>
        </View>
        <View style={[SpaceStyles.m4, styles.profileBoxContentContainer]}>
          <Scroll size="16" color={colors.PRIMARY_COLOR} variant="Bold" />
          <Text style={[styles.detailItemText]}>0 Jobs Completed</Text>
        </View>
      </View>
    );
  };

  const PosterDetailContainer = () => {
    return (
      <View style={[styles.detailItemCOntainer]}>
        <View style={[SpaceStyles.m4, styles.profileBoxContentContainer]}>
          <Location size="16" color={colors.PRIMARY_COLOR} variant="Bold" />
          <Text style={[styles.detailItemText]}>New South Wales</Text>
        </View>
        <View style={[SpaceStyles.m4, styles.profileBoxContentContainer]}>
          <Bag2 size="16" color={colors.PRIMARY_COLOR} variant="Bold" />
          <Text style={[styles.detailItemText]}>{jobCount} Jobs Posted</Text>
        </View>
      </View>
    );
  };

  const UserBio = () => {
    return (
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 8,
          },
        ]}>
        <Text
          numberOfLines={3}
          style={[
            {
              color: colors.THEME_GRAY,
              fontSize: 16,
              lineHeight: 21,
              textAlign: 'justify',
            },
          ]}>
          {userData?.about}
        </Text>
      </View>
    );
  };

  const VerificationView = () => {
    return (
      <View style={[styles.notificationBadgeContainer]}>
        <InfoCircle size={16} color={colors.PRIMARY_COLOR} />
        {verificationStatus == false ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Alert',
                'Still in Development,Use manual verification by admin',
              );
              // navigation.navigate('StartVerificationProcess')
            }}>
            <Text
              style={[
                TextStyles.H6,
                {
                  color: colors.THEME_GRAY,
                  marginLeft: 8,
                  fontWeight: 'bold',
                },
              ]}>
              Click here to verify your account
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const ActionItem = ({
    text,
    icon,
    onPress,
  }: {
    text: string;
    icon: JSX.Element;
    onPress: () => void;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.actionContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {icon}
        <Text style={[styles.actionItemText]}>{text}</Text>
      </View>
      <ArrowRight2 size={20} color={colors.THEME_GRAY} />
    </TouchableOpacity>
  );

  const ActionView = () => {
    return (
      <View style={{ backgroundColor: '#ABB8C366', gap: 1 }}>
        <ActionItem
          text="Dashboard"
          icon={<User size={20} color={colors.PRIMARY_COLOR} />}
          onPress={() => {
            switchState ? null : navigateTo('TaskerDashboard');
          }}
        />
        {switchState ? (
          <ActionItem
            text="Poster Address"
            icon={<LocationAdd size={20} color={colors.PRIMARY_COLOR} />}
            onPress={() => navigateTo('PosterAdressesScreen')}
          />
        ) : (
          <ActionItem
            text="Tasker Address"
            icon={<LocationAdd size={20} color={colors.PRIMARY_COLOR} />}
            onPress={() => navigateTo('TaskerAdresses')}
          />
        )}
        {!switchState && (
          <>
            <ActionItem
              text="Bank Details"
              icon={<Bank size={20} color={colors.PRIMARY_COLOR} />}
              onPress={() => navigateTo('BankDetails')}
            />
            <ActionItem
              text="License"
              icon={<ReceiptSearch size={20} color={colors.PRIMARY_COLOR} />}
              onPress={() => navigateTo('SelectTaskerCategory')}
            />
            <ActionItem
              text="Ratings"
              icon={
                <Star1 size={20} color={colors.PRIMARY_COLOR} variant="Bulk" />
              }
              onPress={() => {}}
            />
          </>
        )}
        <ActionItem
          text="Change Password"
          icon={<Lock size={20} color={colors.PRIMARY_COLOR} />}
          onPress={() => navigateTo('ChangePassword')}
        />

        <ActionItem
          text="History"
          icon={<MoneySend size={20} color={colors.PRIMARY_COLOR} />}
          onPress={() => {}}
        />

        <ActionItem
          text="Privacy Policy"
          icon={<DocumentText size={20} color={colors.PRIMARY_COLOR} />}
          onPress={() => {}}
        />
        <ActionItem
          text="Sign Out"
          icon={<Logout size={20} color={colors.PRIMARY_COLOR} />}
          onPress={() => logoutAction()}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[ScreenStyles.container]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        <View>
          <Image
            source={
              userData?.cover_pic
                ? { uri: userData?.cover_pic, cache: 'default' }
                : require('../../../assets/images/testImage.jpg')
            }
            style={[
              {
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height / 4,
                backgroundColor: colors.PRIMARY_COLOR,
              },
            ]}
          />
          <View
            style={[
              SpaceStyles.m8,
              { alignItems: 'flex-start', paddingHorizontal: 16 },
            ]}>
            <Image
              source={
                userData?.profile_pic
                  ? { uri: userData.profile_pic, cache: 'default' }
                  : require('../../../assets/images/user_dummy.png')
              }
              style={[
                styles.profileImage,
                { borderColor: colors.PRIMARY_WHITE },
              ]}
            />

            <View
              style={[
                {
                  width: '100%',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginHorizontal: 0,
                  gap: 0,
                },
              ]}>
              <View>
                <Text
                  style={[
                    TextStyles.H3,
                    {
                      ...TextStyles.H3,
                      fontWeight: 'bold',
                    },
                  ]}>
                  {userData ? `${userData.firstName} ${userData.lastName}` : ''}{' '}
                </Text>
                {switchState == false ? (
                  <View
                    style={[
                      { gap: 2, alignItems: 'center', flexDirection: 'row' },
                    ]}>
                    <StarRating
                      rating={rating}
                      onChange={() => {}}
                      starSize={20}
                      enableHalfStar={true}
                      starStyle={{ marginHorizontal: 0 }}
                    />
                    <Text
                      style={[
                        TextStyles.H5,
                        { color: colors.PRIMARY_BLACK, textAlign: 'center' },
                      ]}>
                      (0)
                    </Text>
                  </View>
                ) : null}

                {switchState ? (
                  <PosterDetailContainer />
                ) : (
                  <TaskerDetailContainer />
                )}
              </View>
            </View>
          </View>
          <View
            style={[
              {
                flexGrow: 1,
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
              },
            ]}>
            <SwitchView />
            <View
              style={[
                {
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TaskerProfile', {
                    taskerDetails: userData,
                  })
                }
                style={[styles.editProfileBtn]}>
                <Eye size={20} color={colors.PRIMARY_COLOR} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateTo('UpdateProfile')}
                style={[styles.editProfileBtn]}>
                <Edit size={20} color={colors.PRIMARY_COLOR} />
              </TouchableOpacity>
            </View>
          </View>
          {switchState ? null : <StatusSwitch />}
          {userData?.about ? <UserBio /> : null}
        </View>
        <View style={[SpaceStyles.m16, { paddingHorizontal: 16 }]}>
          {switchState == false && verificationStatus == false ? (
            <VerificationView />
          ) : null}
          <ActionView />
        </View>
        <Text style={styles.copyrightText}>Copyright © 2024 TaskBear</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editProfileBtn: {
    flexDirection: 'row',
    borderColor: colors.PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
  },
  notificationBadgeContainer: {
    backgroundColor: '#EDFCF2',
    padding: 16,
    marginTop: 4,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#66B584',
    borderLeftWidth: 4,
    borderStyle: 'solid',
  },
  topHeaderContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: 0.5,
  },
  profileContainer: {
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_WHITE,
    borderColor: '#CCC',
    borderWidth: 0.5,
    gap: 16,
    elevation: 4,
    paddingBottom: 16,
  },
  profileImage: {
    marginTop: '-28%',
    width: Dimensions.get('screen').width / 3,
    height: Dimensions.get('screen').width / 3,
    borderWidth: 4,
    borderRadius: Dimensions.get('screen').width / 3,
    backgroundColor: '#FFF',
  },
  switchContainer: {
    flexDirection: 'row',
    borderColor: colors.PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 8,
    width: Dimensions.get('screen').width / 2,
    justifyContent: 'center',
    padding: 0,
    gap: 0,
    margin: 0,
  },
  switchActive: {
    backgroundColor: colors.SECONDARY_COLOR,
  },
  switchText: {
    ...TextStyles.H5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  profileBoxContentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  profileBoxContentMiddleSpace: {
    borderRightWidth: 2,
    borderColor: 'rgba(0, 110, 233, 0.23)',
  },
  actionItemContainer: {
    backgroundColor: colors.PRIMARY_WHITE,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  actionItemText: {
    ...TextStyles.H5,
    fontWeight: 'bold',
    lineHeight: 20,
    color: colors.PRIMARY_GRAY,
  },
  actionItemTopBorder: {
    borderTopWidth: 1,
    borderColor: 'rgba(171,184,195,0.4)',
  },
  copyrightText: {
    fontSize: 12,
    color: colors.PRIMARY_BLACK,
    textAlign: 'center',
    padding: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.PRIMARY_WHITE,
    paddingVertical: 16,
  },
  detailItemText: {
    ...TextStyles.H7,
    color: colors.PRIMARY_GRAY,
    fontWeight: 'bold',
  },
  detailItemCOntainer: {
    alignItems: 'center',
    marginHorizontal: 0,
    gap: 4,
    width: '100%',
    paddingTop: 8,
  },
});

export default SettingsScreen;
