export interface TravelPartnerRequests {
  id: string;
  userImage: string;
  name: string;
  title: string;
  routeDetails: string;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
  onPress?: () => void;
}
