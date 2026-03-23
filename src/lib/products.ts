import productTeeBlack from "@/assets/product-tee-black.jpg";
import productHoodieWhite from "@/assets/product-hoodie-white.jpg";
import productCargoOlive from "@/assets/product-cargo-olive.jpg";
import productCrewBeige from "@/assets/product-crew-beige.jpg";
import productBomberBlack from "@/assets/product-bomber-black.jpg";
import productJoggersGrey from "@/assets/product-joggers-grey.jpg";
import productTrackNavy from "@/assets/product-track-navy.jpg";
import productGraphicTee from "@/assets/product-graphic-tee.jpg";
import productWidePants from "@/assets/product-wide-pants.jpg";
import productPufferVest from "@/assets/product-puffer-vest.jpg";
import productShortsCharcoal from "@/assets/product-shorts-charcoal.jpg";
import productTruckerTan from "@/assets/product-trucker-tan.jpg";
import productTankBlack from "@/assets/product-tank-black.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "tops" | "bottoms" | "outerwear";
  sizes: string[];
  colors: string[];
  isLimitedDrop: boolean;
  dropEndsAt?: string;
  isSoldOut: boolean;
  description: string;
};

export const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Essential Oversized Tee",
    price: 65,
    image: productTeeBlack,
    category: "tops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Grey"],
    isLimitedDrop: false,
    isSoldOut: false,
    description: "Premium 300gsm cotton oversized tee. Dropped shoulders, ribbed collar, woven label at back neck. Cut for a relaxed, contemporary silhouette.",
  },
  {
    id: "2",
    name: "Heavyweight Hoodie",
    price: 120,
    image: productHoodieWhite,
    category: "tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Sand"],
    isLimitedDrop: true,
    dropEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    isSoldOut: false,
    description: "450gsm French terry hoodie with kangaroo pocket. Oversized fit, flat drawcord, and reinforced seams throughout.",
  },
  {
    id: "3",
    name: "Tactical Cargo Pant",
    price: 95,
    image: productCargoOlive,
    category: "bottoms",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Olive", "Black", "Khaki"],
    isLimitedDrop: false,
    isSoldOut: false,
    description: "Ripstop cargo pants with articulated knees and adjustable ankle cuffs. Six-pocket design with YKK zippers.",
  },
  {
    id: "4",
    name: "Relaxed Crewneck",
    price: 85,
    image: productCrewBeige,
    category: "tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Charcoal", "Cream"],
    isLimitedDrop: false,
    isSoldOut: false,
    description: "Midweight fleece crewneck with a relaxed, boxy fit. Ribbed cuffs and hem, embroidered logo at chest.",
  },
  {
    id: "5",
    name: "MA-1 Bomber",
    price: 185,
    image: productBomberBlack,
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive"],
    isLimitedDrop: true,
    dropEndsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    isSoldOut: false,
    description: "Classic MA-1 bomber silhouette in water-resistant nylon. Quilted lining, ribbed collar, cuffs and hem.",
  },
  {
    id: "6",
    name: "Essential Jogger",
    price: 80,
    image: productJoggersGrey,
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey", "Black", "Navy"],
    isLimitedDrop: false,
    isSoldOut: false,
    description: "380gsm fleece joggers with tapered leg. Elastic waist with drawcord, side pockets, and ribbed ankle cuffs.",
  },
  {
    id: "7",
    name: "Track Jacket",
    price: 110,
    image: productTrackNavy,
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black"],
    isLimitedDrop: false,
    isSoldOut: true,
    description: "Retro-inspired full-zip track jacket. Contrast piping, stand collar, and welt pockets. Regular fit.",
  },
  {
    id: "8",
    name: "Abstract Graphic Tee",
    price: 75,
    image: productGraphicTee,
    category: "tops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    isLimitedDrop: true,
    dropEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    isSoldOut: false,
    description: "Artist collaboration tee featuring an abstract hand-drawn graphic. Screen-printed on 280gsm organic cotton.",
  },
  {
    id: "9",
    name: "Wide Leg Trouser",
    price: 105,
    image: productWidePants,
    category: "bottoms",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black", "Charcoal"],
    isLimitedDrop: false,
    isSoldOut: false,
    description: "Relaxed wide-leg trousers in heavyweight twill. Elasticated waist, deep pockets, clean minimal construction.",
  },
  {
    id: "10",
    name: "Down Puffer Vest",
    price: 160,
    image: productPufferVest,
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Forest Green", "Black"],
    isLimitedDrop: false,
    isSoldOut: false,
    description: "700-fill responsible down puffer vest. Stand collar, two-way zip, and water-resistant shell.",
  },
  {
    id: "11",
    name: "Performance Short",
    price: 60,
    image: productShortsCharcoal,
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Black", "Navy"],
    isLimitedDrop: false,
    isSoldOut: false,
    description: "7-inch inseam athletic shorts in 4-way stretch fabric. Zippered pockets, elastic waist with internal drawcord.",
  },
  {
    id: "12",
    name: "Trucker Jacket",
    price: 195,
    image: productTruckerTan,
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Tan", "Black"],
    isLimitedDrop: true,
    dropEndsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    isSoldOut: false,
    description: "Classic trucker jacket in heavy cotton twill. Chest flap pockets, button front, adjustable side tabs.",
  },
  {
    id: "13",
    name: "Ribbed Tank",
    price: 40,
    image: productTankBlack,
    category: "tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Grey"],
    isLimitedDrop: false,
    isSoldOut: false,
    description: "Fine-gauge ribbed tank top in premium Pima cotton. Slim fit with bound neckline and armholes.",
  },
];

// Reactive product store
let _products: Product[] = [...defaultProducts];
let _listeners: (() => void)[] = [];

export const productStore = {
  getProducts: () => _products,
  setProducts: (products: Product[]) => {
    _products = products;
    _listeners.forEach((fn) => fn());
  },
  addProduct: (product: Product) => {
    _products = [..._products, product];
    _listeners.forEach((fn) => fn());
  },
  updateProduct: (id: string, updates: Partial<Product>) => {
    _products = _products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    _listeners.forEach((fn) => fn());
  },
  deleteProduct: (id: string) => {
    _products = _products.filter((p) => p.id !== id);
    _listeners.forEach((fn) => fn());
  },
  subscribe: (fn: () => void) => {
    _listeners.push(fn);
    return () => {
      _listeners = _listeners.filter((l) => l !== fn);
    };
  },
};

// Hook
import { useSyncExternalStore } from "react";
export function useProducts() {
  return useSyncExternalStore(productStore.subscribe, productStore.getProducts);
}
