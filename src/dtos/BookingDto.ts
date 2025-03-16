import { PurposeDto } from "./PurposeDto";
import { ResourceDto } from "./ResourceDto";
import { RoomOrHallDto } from "./RoomOrHallDto";
import { TypesDto } from "./TypesDto";

export interface BookingDto {
  id: number;
  name: string;
  mobileNo: string;
  address: string;
  city: string | null;
  state: string | null;
  pinCode: number | null;
  purpose: PurposeDto;
  purposeId: number;
  roomOrHall: RoomOrHallDto;
  roomOrHallId: number;
  types: TypesDto;
  typesId: number;
  resource: ResourceDto;
  resourceId: number;
  totalPerson: number;
  stayDate: string;
  stayTime: string;
  checkOutDate: string;
  checkOutTime: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  createdOn: string;
  updatedOn: string | null;
}
