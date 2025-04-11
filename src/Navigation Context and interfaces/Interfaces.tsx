import { NavigationProp } from '@react-navigation/native';

export interface Props {
  navigation: NavigationProp<any>;
}

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface Entry {
  id: string,
  Image: string,
  Location: string,
  Address: string,

}