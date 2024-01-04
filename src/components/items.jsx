import midbackChair from "../assets/midback-chair.jpg"
import lazySofa from "../assets/lazy-sofa.jpg"
import endTable from "../assets/end-table.jpg"
import writingDesk from "../assets/writing-desk.jpg"
import sideTable from "../assets/side-table.jpg"
import springBed from "../assets/spring-bed.jpg"
import memoryFoam from "../assets/memory-foam.jpg"
import latexBed from "../assets/latex-bed.jpg"
import floorFan from "../assets/floor-fan.jpg"
import wallFan from "../assets/wall-fan.jpg"
import neckPillow from "../assets/neck-pillow.jpg"
import beanBag from "../assets/bean-bag.jpg"
import soupPlate from "../assets/soup-plate.jpg"
import dessertPlate from "../assets/dessert-plate.jpg"
import teaSpoon from "../assets/tea-spoon.jpg"
import saladSpoon from "../assets/salad-spoon.jpg"
import slicingKnife from "../assets/slicing-knife.jpg"
import boningKnife from "../assets/boning-knife.jpg"
import basicMicrowave from "../assets/basic-microwave.jpg"
import grillMicrowave from "../assets/grill-microwave.jpg"
import handBlender from "../assets/hand-blender.jpg"
import fullSizeBlender from "../assets/full-size-blender.jpg"

export let items = [
    {
        id: 1,
        quantity: 1,
        name: "Midback Chair",
        price: 110,
        img: midbackChair,
        categories: ["house", "midback", "chair", "furniture", "ofiice", "seat"],
        explanation: "Our Midback Chair is designed with ergonomic support and modern aesthetics, making it the perfect addition to your office or home workspace. Its cushioned seat and adjustable features ensure comfort during long hours of use, promoting better posture and productivity.",
        texture: "Plastic",
        weight: 7,
        size: "60cm x 50cm"
    },
    {
        id: 2,
        quantity: 1,
        name: "La-Z-Sofa",
        price: 120,
        img: lazySofa,
        categories: [ "house","chair", "lazy", "sofa", "furniture", "seat"],
        explanation: "Experience ultimate relaxation with our La-Z-Sofa. This plush and spacious sofa is crafted for exceptional comfort, making it an inviting centerpiece for your living room. Sink into its luxurious cushions and unwind after a long day, enjoying quality time with family and friends.",
        texture: "Kapok",
        weight: 4,
        size: "150cm x 75cm"
    },
    {
        id: 3,
        quantity: 1,
        name: "End Table",
        price: 130,
        img: endTable,
        categories: ["house", "end", "table", "desk", "furniture"],
        explanation: "Elevate your living space with our End Table. Crafted from high-quality materials, it adds a touch of sophistication to any room. With its practical design, you can conveniently place your books, remote controls, or decor items, making it both stylish and functional.",
        texture: "Wood",
        weight: 7,
        size: "100cm x 100cm"
    },
    {
        id: 4,
        quantity: 1,
        name: "Writing Desk",
        price: 200,
        img: writingDesk,
        categories: ["house", "table", "writing", "desk", "furniture"],
        explanation: "Boost your productivity with our Writing Desk. Its sleek and sturdy construction provides an organized workspace, while the minimalist design complements various decor styles. Whether for work or creative pursuits, this desk is your perfect companion.",
        texture: "Wood",
        weight: 7,
        size: "170cm x 70cm"
    },
    {
        id: 5,
        quantity: 1,
        name: "Side Table",
        price: 150,
        img: sideTable,
        categories: ["house", "side", "table", "desk", "furniture"],
        explanation: "Our Side Table combines elegance and utility. Its compact size makes it suitable for tight spaces, and the open shelving offers convenient storage for your essentials. Enjoy easy access to your snacks and beverages while enhancing the aesthetics of your room.",
        texture: "Wood",
        weight: 6,
        size: "60cm x 60cm"
    },
    {
        id: 6,
        quantity: 1,
        name: "Spring Bed",
        price: 400,
        img: springBed,
        categories: ["house", "spring", "bed", "bedroom", "sleep"],
        explanation: "Enjoy a restful sleep on our Spring Bed. Designed with advanced spring technology, it provides optimal support for a comfortable night's rest. Wake up feeling rejuvenated and ready to take on the day with this quality mattress.",
        texture: "Kapok",
        weight: 70,
        size: "200cm x 170cm"
    },
    {
        id: 7,
        quantity: 1,
        name: "Memory Foam",
        price: 395,
        img: memoryFoam,
        categories: ["house", "bed", "bedroom", "sleep", "memory", "foam"],
        explanation: "Experience the ultimate in sleep comfort with our Memory Foam mattress. It conforms to your body, relieving pressure points and promoting deep, uninterrupted sleep. Upgrade your sleep quality and overall well-being with this luxurious mattress.",
        texture: "Foam",
        weight: 65,
        size: "190cm x 150cm"
    },
    {
        id: 8,
        quantity: 1,
        name: "Latex Bed",
        price: 375,
        img: latexBed,
        categories: ["house", "bed", "bedroom", "sleep", "latex"],
        explanation: "Our Latex Bed offers a natural and eco-friendly sleep solution. With its latex core, it provides exceptional support and breathability, ensuring a comfortable and healthy sleep environment. Invest in your well-being with this durable and sustainable mattress.",
        texture: "Latex",
        weight: 65,
        size: "190cm x 150cm"
    },
    {
        id: 9,
        name: "Floor Fan",
        price: 175,
        img: floorFan,
        explanation: "Our versatile floor fan is designed to keep your living spaces cool and comfortable. With its adjustable height and multi-speed settings, it's the perfect solution for beating the heat during warm summer days. Its sleek and modern design seamlessly blends with any room decor, making it a stylish and functional addition to your home.",
        categories: "[\"furniture\", \"wind\", \"bed\", \"bedroom\", \"floor\", \"cool\"]",
        texture: "Iron",
        weight: 5,
        size: "100cm x 100cm"
    },
    {
        id: 10,
        name: "Wall Fan",
        price: 195,
        img: wallFan,
        explanation: "Introducing our wall fan, a space-saving cooling solution for your home. Mount this fan on any wall to maximize airflow while minimizing floor space usage. The oscillating feature ensures even distribution of cool air throughout the room, making it an efficient and unobtrusive addition to your household. Say goodbye to stuffy rooms and hello to comfort with our wall fan.",
        categories: "[\"furniture\", \"wind\", \"bed\", \"bedroom\", \"cool\"]",
        texture: "Iron",
        weight: 6,
        size: "100cm x 100cm"
    },
    {
        id: 11,
        quantity: 1,
        name: "Neck Pillow",
        price: 50,
        img: neckPillow,
        categories: ["house", "bed", "bedroom", "sleep", "pillow", "neck", "relax"],
        explanation: "Say goodbye to neck discomfort with our Neck Pillow. Whether you're traveling or relaxing at home, its ergonomic design provides essential support. Enjoy pain relief and relaxation whenever you need it.",
        texture: "Kapok",
        weight: 1,
        size: "50cm x 50cm"
    },
    {
        id: 12,
        quantity: 1,
        name: "Bean Bag",
        price: 120,
        img: beanBag,
        categories: ["house", "furniture", "bean", "bag", "pillow", "relax"],
        explanation: "Dive into relaxation with our Bean Bag. This oversized, ultra-comfortable chair adapts to your body, making it the ideal spot for lounging and unwinding. It's a versatile addition to any living space, creating a cozy corner for leisure and relaxation.",
        texture: "Kapok",
        weight: 2,
        size: "150cm x 75cm"
    },
    {
        id: 13,
        quantity: 1,
        name: "Soup Plate",
        price: 30,
        img: soupPlate,
        categories: ["house", "kitchen", "plate", "soap", "eat"],
        explanation: "Our Soup Plate is designed with both style and functionality in mind. Its deep design is perfect for serving hearty soups and stews, while its elegant aesthetic enhances your dining experience.",
        texture: "Metal",
        weight: 0.3,
        size: "15cm x 15cm"
    },
    {
        id: 14,
        quantity: 1,
        name: "Dessert Plate",
        price: 30,
        img: dessertPlate,
        categories: ["house", "kitchen", "plate", "dessert", "eat",],
        explanation: "Elevate your dessert presentation with our Dessert Plate. Its elegant design complements sweet treats and adds a touch of sophistication to your table setting, making it ideal for special occasions and everyday use.",
        texture: "Metal",
        weight: 0.3,
        size: "15cm x 15cm"
    },
    {
        id: 15,
        quantity: 1,
        name: "Tea Spoon",
        price: 20,
        img: teaSpoon,
        categories: ["house", "kitchen", "spoon", "tea", "eat"],
        explanation: "Enhance your tea time with our Tea Spoon. Crafted for both beauty and practicality, it adds a touch of elegance to your tea service. Its ergonomic design ensures comfortable stirring and sipping.",
        texture: "Metal",
        weight: 0.1,
        size: "10cm x 2cm"
    },
    {
        id: 16,
        quantity: 1,
        name: "Salad Spoon",
        price: 20,
        img: saladSpoon,
        categories: ["house", "kitchen", "spoon", "salad", "eat"],
        explanation: "Serve salads with style using our Salad Spoon. Its unique design makes tossing and serving salads effortless, while the quality craftsmanship adds a refined touch to your dining table.",
        texture: "Metal",
        weight: 0.1,
        size: "10cm x 2cm"
    },
    {
        id: 17,
        quantity: 1,
        name: "Slicing Knife",
        price: 90,
        img: slicingKnife,
        categories: ["house", "kitchen", "knife", "slicing", "slice", "eat"],
        explanation: "Our Slicing Knife is a kitchen essential for precise cutting. Its sharp blade effortlessly slices through meats, bread, and more, ensuring uniform slices for a professional culinary experience.",
        texture: "Metal",
        weight: 0.2,
        size: "30cm x 5cm"
    },
    {
        id: 18,
        quantity: 1,
        name: "Boning Knife",
        price: 100,
        img: boningKnife,
        categories: ["house", "kitchen", "knife", "boning", "bone", "eat"],
        explanation: "Achieve expert precision with our Boning Knife. Designed for delicate tasks like deboning and filleting, it's a must-have for any chef or home cook. The sharp blade and ergonomic handle make food preparation a breeze.",
        texture: "Metal",
        weight: 0.2,
        size: "30cm x 5cm"
    },
    {
        id: 19,
        quantity: 1,
        name: "Basic Microwave",
        price: 425,
        img: basicMicrowave,
        categories: ["house", "kitchen", "basic", "microwave", "heat", "eat"],
        explanation: "Simplify your cooking routine with our Basic Microwave. This versatile appliance offers quick and efficient heating for your favorite dishes, snacks, and beverages. Its user-friendly features make it an essential kitchen companion.",
        texture: "Metal",
        weight: 5,
        size: "90cm x 60cm"
    },
    {
        id: 20,
        quantity: 1,
        name: "Grill Microwave",
        price: 445,
        img: grillMicrowave,
        categories: ["house", "kitchen", "microwave", "grill", "heat", "eat"],
        explanation: "Elevate your cooking options with our Grill Microwave. In addition to standard heating, it features a grilling function, allowing you to create delicious, crispy dishes. It's perfect for preparing a wide range of meals with ease.",
        texture: "Metal",
        weight: 5,
        size: "90cm x 60cm"
    },
    {
        id: 21,
        quantity: 1,
        name: "Hand Blender",
        price: 215,
        img: handBlender,
        categories: ["house", "kitchen", "hand", "blender", "eat"],
        explanation: "Our Hand Blender is a versatile kitchen tool for blending, chopping, and pureeing. Its ergonomic design and powerful motor make food preparation quick and convenient, simplifying your cooking tasks.",
        texture: "Metal",
        weight: 2,
        size: "80cm x 20cm"
    },
    {
        id: 22,
        quantity: 1,
        name: "Full Size Blender",
        price: 200,
        img: fullSizeBlender,
        categories: ["house", "kitchen", "full", "size", "blender", "eat"],
        explanation: "Experience the ultimate blending performance with our Full Size Blender. Whether you're making smoothies, soups, or sauces, this appliance's robust motor and multiple speed settings ensure flawless results every time. Make healthy and delicious creations effortlessly with this kitchen essential.",
        texture: "Metal",
        weight: 3,
        size: "80cm x 30cm"
    }
]