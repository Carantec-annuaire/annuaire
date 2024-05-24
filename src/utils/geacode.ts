// src/utils/geocode.ts
import axios from 'axios';

export const geocodeAddress = async (address: string): Promise<{ latitude: number; longitude: number }> => {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: address,
            format: 'json',
            addressdetails: 1,
            limit: 1,
        },
    });

    if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        };
    } else {
        throw new Error('Address not found');
    }
};
