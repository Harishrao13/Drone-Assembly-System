export interface User {
    username: string;
    authority?: boolean; 
  }

export interface UserContextType {
    user: User | null;
    isAdmin: boolean;
    fetchUserInfo: () => void;
}