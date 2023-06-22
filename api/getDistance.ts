import type { VercelRequest, VercelResponse } from '@vercel/node';
import { cities } from './cities';
import { calculateDistance } from './utils';
import { Range } from './types';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { cities = "" } = req.query;

  console.log('cities', cities.split(','));
  // Example usage:
  // const cityNames = ["Grenoble", "Dijon", "Nîmes"];
  const totalDistance = calculateTripDistance(cities.split(','));
  return res.json({
    result: totalDistance
  })
}

function calculateTripDistance(cityNames) {
  let totalDistance = 0;
  const ranges:Range[] = [];

  for (let i = 0; i < cityNames.length - 1; i++) {
    const startCity = cities.find(city => city.name === cityNames[i]);
    const endCity = cities.find(city => city.name === cityNames[i + 1]);

    if (!startCity || !endCity) {
      throw new Error("City not found");
    }
    const distance = calculateDistance(startCity.latitude, startCity.longitude, endCity.latitude, endCity.longitude);
    totalDistance += distance;

    ranges.push({
      from: startCity.name,
      to: endCity.name,
      distance
    })
  }

  return {
    ranges,
    totalDistance: totalDistance.toFixed(2)
  }

}