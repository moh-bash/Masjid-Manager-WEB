export interface sendMosque{
  name: string;
  managerEmail: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  description: string;
};

export interface Mosque {
  id: string;
  name: string;
  manager: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
  };

  location: {
    lat: number;
    lng: number;
  };

  address: string;
  description: string;

  createdAt: string;
  updatedAt: string;
}

export interface MosqueManager {
  id: string;
  name: string;
  manager:{
    id: string;
  }
}