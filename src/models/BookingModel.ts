export interface BookingModel {
  name: string;
  mobileNo: string;
  address: string;
  city?: string | null;
  state?: string | null;
  pinCode?: number;
  purposeId: number;
  roomOrHallId: number;
  typesId: number;
  resourceId: number;
  totalPerson: number;
  stayDate: string;
  stayTime: string;
  checkOutDate: string;
  checkOutTime: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
}
