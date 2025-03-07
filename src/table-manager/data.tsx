/** @format */


interface Nutritions {
  label: string;
  value: string;
}

export interface Detail {
  id: number;
  name: string;
  description: string;
  link: string;
  shouldCook: boolean;
  nutrition: string[];
  quantity: string;
}
const data: Detail[] = [
  {
    id: 1,
    name: "Potato",
    description: "It is a root vegetable",
    link: "https://en.wikipedia.org/wiki/Potato",
    shouldCook: true,
    nutrition: ["Vitamin C" , "Vitamin D" , "Vitamin B6 "],
    quantity: "250g",
  },
  {
    id: 2,
    name: "Tomato",
    description: "It is usually a fruit , but considered as Vegetable",
    link: "https://en.wikipedia.org/wiki/Tomato",
    shouldCook: true,
    nutrition: ["Vitamin A" , "Vitamin B2" , "Vitamin B12 "],
    quantity: "125g",
  },
];

const nutritions: Nutritions[] = [
  { label: "Vitamin C", value: "vitamin-c" },
  { label: "Vitamin A", value: "vitamin-a" },
  { label: "Vitamin D", value: "vitamin-d" },
  { label: "Vitamin E", value: "vitamin-e" },
  { label: "Vitamin B", value: "vitamin-b" },
  { label: "Vitamin K", value: "vitamin-k" },
  { label: "Vitamin B6", value: "vitamin-b6" },
  { label: "Vitamin B12", value: "vitamin-b12" },
];

export {data , nutritions};
