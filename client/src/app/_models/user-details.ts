export interface FullUser {
  profilePicUrl: string | null;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  regnumber: string | null;
  bio?: string;
  city?: string;
  country?: string;
  facebookLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  whatsappLink?: string;
}
