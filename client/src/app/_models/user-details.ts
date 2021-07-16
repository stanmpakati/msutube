export interface FullUser {
  name: { first: string; last: string };
  profilePicUrl?: string | null;
  username: string;
  email: string;
  regnumber?: string | null;
  bio?: string;
  location?: { city?: string; country?: string };
  facebookLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  whatsappLink?: string;
}
