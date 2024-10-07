import Innova from '../../../../assets/vehicle1/innova.png';
import Truck1 from '../../../../assets/vehicle1/truck4.png';
import Fortuner from '../../../../assets/vehicle1/fortuner.png';
import Safari from '../../../../assets/vehicle1/tata-safari.png';
import BMW from '../../../../assets/vehicle1/bmw.png';
import Ace from '../../../../assets/vehicle1/tata-ace.png';
import Truck2 from '../../../../assets/vehicle1/truck2.png';
import Duster from '../../../../assets/vehicle1/duster.png';
import Truck3 from '../../../../assets/vehicle1/truck3.png';

export interface Vehicle {
    id: number;
    name: string;
    businessClass: string;
    description: string;
    image: string;
    passengers: number;
    price: number;
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Innova HYCROSS Hybrid",
    businessClass: "Car",
    description: "A comfortable and spacious MPV ideal for long-distance family or business trips.",
    image: Innova,
    passengers: 3,  // Adjusting to actual seating capacity of the Innova
    price: 1500
  },
  {
    id: 2,
    name: "Bharat Benz Truck",
    businessClass: "Truck",
    description: "Designed for transporting heavy loads with powerful performance and reliability.",
    image: Truck1,
    passengers: 0,  // Trucks usually have a lower passenger capacity
    price: 2500
  },
  {
    id: 3,
    name: "BMW x1 (Silver)",
    businessClass: "Car",
    description: "Experience the perfect blend of luxury and adventure with the BMW x1, offering a spacious interior, advanced safety features, and a powerful engine.",
    image: BMW,
    passengers: 3,
    price: 1800
  },
  {
    id: 4,
    name: "Tata Safari",
    businessClass: "Car",
    description: "Experience the thrill of adventure with the Tata Safari, a premium SUV that combines rugged capabilities with spacious interiors and advanced features.",
    image: Safari,
    passengers: 3,
    price: 1800
  },
  {
    id: 5,
    name: "Toyota Fortuner",
    businessClass: "Car",
    description: "A premium SUV with rugged capabilities, spacious interiors, and advanced features.",
    image: Fortuner,
    passengers: 3,
    price: 1800
  },
  {
    id: 6,
    name: "Bharat Benz Truck",
    businessClass: "Truck ",
    description: "Efficient and powerful truck for various commercial transport purposes.",
    image: Truck2,
    passengers: 0,
    price: 2400
  },
  {
    id: 7,
    name: "Renault Duster",
    businessClass: "Car",
    description: "A versatile and affordable SUV suitable for both urban and off-road adventures.",
    image: Duster,
    passengers: 3,
    price: 1400
  },
  {
    id: 8,
    name: "Bharat Benz Truck",
    businessClass: "Truck",
    description: "Ideal for long-distance cargo transportation with high durability and fuel efficiency.",
    image: Truck3,
    passengers: 0,
    price: 2600
  },
  {
    id: 9,
    name: "Tata Ace",
    businessClass: "Truck",
    description: "The Tata Ace is a reliable and efficient truck for long-distance cargo transportation, offering high durability and fuel efficiency.",
    image: Ace,
    passengers: 0,
    price: 2600
  }
];
