import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp,
  getDocs
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

export interface FoodListing {
  id: string;
  providerId: string;
  providerName: string;
  foodType: string;
  quantity: string;
  servings: number;
  preparationTime: Date;
  expiryTime: Date;
  location: {
    address: string;
    lat?: number;
    lng?: number;
  };
  priority: 'high' | 'medium' | 'low';
  status: 'posted' | 'accepted' | 'collected';
  acceptedBy?: string;
  acceptedByName?: string;
  createdAt: Date;
  notes?: string;
}

export const useFoodListings = () => {
  const { user, profile } = useAuth();
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [myListings, setMyListings] = useState<FoodListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to all available listings (for NGOs)
  useEffect(() => {
    const q = query(
      collection(db, 'foodListings'),
      where('status', 'in', ['posted', 'accepted']),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        preparationTime: doc.data().preparationTime?.toDate(),
        expiryTime: doc.data().expiryTime?.toDate(),
        createdAt: doc.data().createdAt?.toDate()
      })) as FoodListing[];
      
      setListings(listingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to user's own listings (for providers)
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'foodListings'),
      where('providerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        preparationTime: doc.data().preparationTime?.toDate(),
        expiryTime: doc.data().expiryTime?.toDate(),
        createdAt: doc.data().createdAt?.toDate()
      })) as FoodListing[];
      
      setMyListings(listingsData);
    });

    return () => unsubscribe();
  }, [user]);

  const calculatePriority = (expiryTime: Date, foodType: string): 'high' | 'medium' | 'low' => {
    const now = new Date();
    const hoursUntilExpiry = (expiryTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    // High priority: expires in less than 2 hours or perishable items
    const perishableTypes = ['dairy', 'meat', 'seafood', 'cooked meals'];
    const isPerishable = perishableTypes.some(type => 
      foodType.toLowerCase().includes(type)
    );
    
    if (hoursUntilExpiry < 2 || (isPerishable && hoursUntilExpiry < 4)) {
      return 'high';
    }
    
    // Medium priority: expires in 2-6 hours
    if (hoursUntilExpiry < 6) {
      return 'medium';
    }
    
    // Low priority: expires in more than 6 hours
    return 'low';
  };

  const addListing = async (data: Omit<FoodListing, 'id' | 'providerId' | 'providerName' | 'priority' | 'status' | 'createdAt'>) => {
    if (!user || !profile) throw new Error('Must be logged in');

    const priority = calculatePriority(data.expiryTime, data.foodType);

    const listing = {
      ...data,
      providerId: user.uid,
      providerName: profile.name || profile.email,
      priority,
      status: 'posted',
      createdAt: Timestamp.now(),
      preparationTime: Timestamp.fromDate(data.preparationTime),
      expiryTime: Timestamp.fromDate(data.expiryTime)
    };

    await addDoc(collection(db, 'foodListings'), listing);
  };

  const acceptListing = async (listingId: string) => {
    if (!user || !profile) throw new Error('Must be logged in');

    await updateDoc(doc(db, 'foodListings', listingId), {
      status: 'accepted',
      acceptedBy: user.uid,
      acceptedByName: profile.name || profile.organization || profile.email
    });
  };

  const markCollected = async (listingId: string) => {
    await updateDoc(doc(db, 'foodListings', listingId), {
      status: 'collected',
      collectedAt: Timestamp.now()
    });
  };

  const getImpactStats = async () => {
    const q = query(
      collection(db, 'foodListings'),
      where('status', '==', 'collected')
    );
    
    const snapshot = await getDocs(q);
    let totalServings = 0;
    
    snapshot.docs.forEach(doc => {
      totalServings += doc.data().servings || 0;
    });

    return {
      mealsRescued: totalServings,
      peopleFed: Math.floor(totalServings * 0.8),
      co2Saved: Math.floor(totalServings * 2.5), // ~2.5kg CO2 per meal saved
      foodSavedKg: Math.floor(totalServings * 0.4) // ~400g per serving
    };
  };

  return {
    listings,
    myListings,
    loading,
    addListing,
    acceptListing,
    markCollected,
    getImpactStats
  };
};
