import RoleDto from "./RoleDto";

export default interface UserDto {
  id: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  fullName: string;
  companyName: string;
  profilePicture: string;
  isActive: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  TtoFactorEnabled: boolean;
  registerDate: Date;
  lockoutEnd: Date | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  timezoneId: string;
  roles: RoleDto[];
  token: string;
}
