interface ProfilePicture {
  height: number;
  width: number;
  url: string;
}

export interface User {
  id: string;
  username: string;
  profilePicture: ProfilePicture;
}

interface Location {
  _latitude: number;
  _longitude: number;
}

interface CreationDate {
  _seconds: number;
  _nanoseconds: number;
}

interface TakenAt {
  _seconds: number;
  _nanoseconds: number;
}

interface Date {
  _seconds: number;
  _nanoseconds: number;
}

export interface RealMoji {
  id: string;
  uid: string;
  userName: string;
  user: User;
  emoji: string;
  type: string;
  uri: string;
  date: Date;
}

export interface FriendsFeedItem {
  id: string;
  notificationID: string;
  ownerID: string;
  userName: string;
  user: User;
  mediaType: string;
  region: string;
  bucket: string;
  photoURL: string;
  imageWidth: number;
  imageHeight: number;
  secondaryPhotoURL: string;
  secondaryImageHeight: number;
  secondaryImageWidth: number;
  members: string[];
  lateInSeconds: number;
  isPublic: boolean;
  location: Location;
  retakeCounter: number;
  creationDate: CreationDate;
  updatedAt: number;
  takenAt: TakenAt;
  comment: any[];
  realMojis: RealMoji[];
  screenshots: any[];
  screenshotsV2: any[];
}
