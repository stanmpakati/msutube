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

export const mockUser: FullUser = {
  username: 'stan',
  email: 'me@stan.co.zw',
  profilePicUrl: null,
  firstname: 'stan',
  lastname: 'Mpakati',
  regnumber: 'R1911268h',
  bio: 'My Bio',
};
