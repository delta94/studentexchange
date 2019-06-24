import { Moment } from 'moment';
import { IWard } from 'app/shared/model//ward.model';

export interface IDistrict {
  id?: number;
  name?: string;
  type?: string;
  latitude?: number;
  longitude?: number;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  cityId?: number;
  wards?: IWard[];
}

export const defaultValue: Readonly<IDistrict> = {
  enabled: false
};
