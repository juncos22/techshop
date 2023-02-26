import { Product } from "@/models/product.model";

export const products: Product[] = [
    {
        id: "1334",
        name: "Laptop ASUS",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non sollicitudin mauris. Nullam gravida aliquet enim, vitae aliquam neque elementum maximus. Quisque non pharetra nulla. Donec vel risus vitae enim consequat porta. Sed sed lacus eu nisl scelerisque tincidunt. Nullam sed nulla urna. Phasellus in tortor non neque cursus tempor eget ac quam. ",
        price: 500,
        image: "https://mexx-img-2019.s3.amazonaws.com/notebook-asus-x515_42286_2.jpeg",
        quantity: 3,
        category: {
            id: "123",
            name: "Laptops"
        }
    },
    {
        id: "1335",
        name: "PC MSI Gamer Intel Core i9",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non sollicitudin mauris. Nullam gravida aliquet enim, vitae aliquam neque elementum maximus. Quisque non pharetra nulla. Donec vel risus vitae enim consequat porta. Sed sed lacus eu nisl scelerisque tincidunt. Nullam sed nulla urna. Phasellus in tortor non neque cursus tempor eget ac quam. ",
        price: 1500,
        image: "https://www.infopartes.com.ar/19002-thickbox_default/gabinete-pc-gamer-msi-mag-vampiric-atx-fan-550w-rgb-80-plus-templado-midtower.jpg",
        quantity: 5,
        category: {
            id: "123",
            name: 'PC Gamer'
        }
    },
    {
        id: "1336",
        name: "Mousepad Razer RGB Gamer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non sollicitudin mauris. Nullam gravida aliquet enim, vitae aliquam neque elementum maximus. Quisque non pharetra nulla. Donec vel risus vitae enim consequat porta. Sed sed lacus eu nisl scelerisque tincidunt. Nullam sed nulla urna. Phasellus in tortor non neque cursus tempor eget ac quam. ",
        price: 800,
        image: "https://assets2.razerzone.com/images/pnx.assets/d4fe9df208d240a26b56bdb58e6b6ac5/razer-mamba-elite-usp01-mobile-gaming-mouse.jpg",
        quantity: 10,
        category: {
            id: "123",
            name: 'Accessories'
        }
    },
    {
        id: "1337",
        name: "Cable RJ-45",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non sollicitudin mauris. Nullam gravida aliquet enim, vitae aliquam neque elementum maximus. Quisque non pharetra nulla. Donec vel risus vitae enim consequat porta. Sed sed lacus eu nisl scelerisque tincidunt. Nullam sed nulla urna. Phasellus in tortor non neque cursus tempor eget ac quam. ",
        price: 10,
        image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/896/208/products/835244-mla31767799342_082019-o-11e153979e06af554315689541955113-640-0.webp",
        quantity: 1,
        category: {
            id: "123",
            name: 'Network'
        }
    }
]