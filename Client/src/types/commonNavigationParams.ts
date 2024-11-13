export type CommonNavigationParams = {
  Splash: undefined;
  BottomTabNavigation: undefined;
  PrivacyPolicy: undefined;
  //Bottom Tab Screens
  HomeScreen: undefined;
  UpdateProfile: undefined;

  //Chat Screens
  ChatUsers: undefined;
  UserChat: undefined;

  //Notification Screens
  Notifications: undefined;
  AuthSelect: undefined;

  ViewListing: undefined;

  AddEducationDetails: undefined;
  AddSkillDetails: undefined;
  AddWorkDetails: undefined;
  AddInterestDetails: undefined;
  LocationSearch: { screenName: string };
};

export type AuthNavigationParams = {
  Login: undefined;
  SignUp: undefined;
  OtpVerification: undefined;
  SignUpSuccess: undefined;
  ChangePassword: undefined;
};

type TaskerVerificationParams = {
  SelectAccountType: undefined;
  ProfileNavigations: undefined;
  BusinessDetailsSetup: undefined;
  StartVerificationProcess: undefined;
  FIllAccountDetails: undefined;
  AccountVerifyScreen: undefined;
};

export type TaskerNavigationParams = TaskerVerificationParams & {
  SelectTaskerCategory: undefined;
  AddBankDetails: undefined;
  BankDetails: undefined;
  FindJob: undefined;
  AddTaskerAddress: undefined;
  TaskerAdresses: undefined;
  OfferDetails: { offerId: string };
  AddTaskerLicense: undefined;
  TaskerDashboard: undefined;
  TaskerLocationSelect: undefined;
  VerifyTaskerLicense: undefined;
  AddListing: undefined;
  UpdateListing: { listingId: string };
  AddListingPackage: undefined;
  ListingTimeSchedule: undefined;
  TaskerRatings: undefined;
  TaskerEducationView: undefined;
};

type CreateJobParams = {
  CreateNewJob: undefined;
  SelectJobLocation: undefined;
  AddNewLocation: undefined;
  SelectCategory: undefined;
  ReviewJobInformation: undefined;
  JobPostedSuccess: undefined;
};

type UpdateJobParams = {
  UpdateJobSelectCategory: undefined;
  EditJobDetails: undefined;
};
export type PosterNavigationParams = CreateJobParams &
  UpdateJobParams & {
    jobOffers: undefined;
    TaskerProfile: undefined;
    InProgressJobs: undefined;
    JobAllBidList: undefined;
    BidDetails: undefined;
    SaveGatherAddress: undefined;
    JobDetails: undefined;
    PosterAdressesScreen: undefined;
    LoadTaskers: undefined;

    PosterLocationSelect: undefined;
  };

export type BottomTabNavigationParams = {
  Home: undefined;
  MyOffers: undefined;
  Listing: undefined;
  Chat: undefined;
  Settings: undefined;
  'My Offers': undefined;
  Jobs: undefined;
  'Ads Center': undefined;
};

export type AppNavigationParams = CommonNavigationParams &
  AuthNavigationParams &
  TaskerNavigationParams &
  PosterNavigationParams;
