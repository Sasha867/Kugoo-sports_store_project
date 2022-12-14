import { CardScooter } from "./interfaces";

export const methodsPayIcons: object[] = [
  {
    id: 1,
    image: "/images/g_pay.png",
  },
  {
    id: 2,
    image: "../images/pay.png",
  },
  {
    id: 3,
    image: "../../images/visa.png",
  },
  {
    id: 4,
    image: "../../../images/master.png",
  },
  {
    id: 5,
    image: "../../images/master_1.png",
  },
  {
    id: 6,
    image: "../../images/webmoney.png",
  },
  {
    id: 7,
    image: "../../images/fox.png",
  },
];

export const URL_STORAGE =
  "https://firebasestorage.googleapis.com/v0/b/kugoo-project.appspot.com/o/";

export const getImageUrl = (url: string) => {
  return `${URL_STORAGE}${url ? url : IMG_NOPHOTO}?alt=media`;
};

export const IMG_NOPHOTO = "image_not_found%2FNo_Photo.png";

export const cardScooter: CardScooter = {
  title: "",
  price: 0,
  stockPrice: 0,
  battery: "",
  maxSpeed: "",
  power: "",
  maxDistance: "",
  charger: "",
  popular: "",
  description: "",
  category: "",
  images: [],
  id: "",
  rating: {
    rate: "",
    count: "",
  },
};
