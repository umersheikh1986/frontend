// import { useEffect, useState } from "react";
// import { StarIcon } from "@heroicons/react/20/solid";
// import { Radio, RadioGroup } from "@headlessui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCartAsync } from "../../cart/cartSlice";
// import {
//   fetchProductByIdAsync,
//   selectProductById,
// } from "../../product/productSlice";
// import { useParams } from "react-router-dom";
// const colors = [
//   { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//   { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//   { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
// ];
// const sizes = [
//   { name: "XXS", inStock: false },
//   { name: "XS", inStock: true },
//   { name: "S", inStock: true },
//   { name: "M", inStock: true },
//   { name: "L", inStock: true },
//   { name: "XL", inStock: true },
//   { name: "2XL", inStock: true },
//   { name: "3XL", inStock: true },
// ];

// const imagePath = (filename) => {
//   if (!filename) return "";
//   return `/uploads/${filename.replace(/\\/g, "/")}`;
// };
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function AdminProductDetails() {
//   const [selectedColor, setSelectedColor] = useState();
//   const [selectedSize, setSelectedSize] = useState();
//   const products = useSelector(selectProductById);

//   const dispatch = useDispatch();
//   const params = useParams();

//   const handleCart = (e) => {
//     e.preventDefault();
//     const newItem = { ...products, quantity: 1 };
//     delete newItem["id"];
//     dispatch(addToCartAsync(newItem));
//   };
//   useEffect(() => {
//     dispatch(fetchProductByIdAsync(params.id));
//   }, [dispatch, params.id]);
//   return (
//     <div className="bg-white">
//       {products ? (
//         <div className="pt-6">
//           <nav aria-label="Breadcrumb">
//             <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//               {products.product &&
//                 products.map((product) => (
//                   <li key={product.id}>
//                     <div className="flex items-center">
//                       <a
//                         href={product.href}
//                         className="mr-2 text-sm font-medium text-gray-900"
//                       >
//                         {product.name}
//                       </a>
//                       image : {product.images[0]}
//                       <svg
//                         width={16}
//                         height={20}
//                         viewBox="0 0 16 20"
//                         fill="currentColor"
//                         aria-hidden="true"
//                         className="h-5 w-4 text-gray-300"
//                       >
//                         <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                       </svg>
//                     </div>
//                   </li>
//                 ))}
//               <li className="text-sm">
//                 <a
//                   href={products.href}
//                   aria-current="page"
//                   className="font-medium text-gray-500 hover:text-gray-600"
//                 >
//                   {products.title}
//                 </a>
//               </li>
//             </ol>
//           </nav>

//           {/* Image gallery */}
//           <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
//             <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
//               <img
//                 src={products.images[0]}
//                 alt={products.title}
//                 className="h-full w-full object-cover object-center"
//               />
//             </div>
//             <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
//               <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//                 <img
//                   src={products.images[1]}
//                   alt={products.title}
//                   className="h-full w-full object-cover object-center"
//                 />
//               </div>
//               <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//                 <img
//                   src={products.images[2]}
//                   alt={products.title}
//                   className="h-full w-full object-cover object-center"
//                 />
//               </div>
//             </div>
//             <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
//               <img
//                 src={products.images[3]}
//                 alt={products.title}
//                 className="h-full w-full object-cover object-center"
//               />
//             </div>
//           </div>

//           {/* Product info */}
//           <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
//             <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//               <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//                 {products.title}
//               </h1>
//             </div>

//             {/* Options */}
//             <div className="mt-4 lg:row-span-3 lg:mt-0">
//               <h2 className="sr-only">Product information</h2>
//               <p className="text-3xl tracking-tight text-gray-900">
//                 ${products.price}
//               </p>

//               {/* Reviews */}
//               <div className="mt-6">
//                 <h3 className="sr-only">Reviews</h3>
//                 <div className="flex items-center">
//                   <div className="flex items-center">
//                     {[0, 1, 2, 3, 4].map((rating) => (
//                       <StarIcon
//                         key={rating}
//                         className={classNames(
//                           products.rating > rating
//                             ? "text-gray-900"
//                             : "text-gray-200",
//                           "h-5 w-5 flex-shrink-0"
//                         )}
//                         aria-hidden="true"
//                       />
//                     ))}
//                   </div>
//                   <p className="sr-only">{products.rating} out of 5 stars</p>
//                 </div>
//               </div>

//               <form className="mt-10">
//                 {/* Colors */}
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-900">Color</h3>

//                   <fieldset aria-label="Choose a color" className="mt-4">
//                     <RadioGroup
//                       value={selectedColor}
//                       onChange={setSelectedColor}
//                       className="flex items-center space-x-3"
//                     >
//                       {products.colors &&
//                         products.colors.map((color) => (
//                           <Radio
//                             key={color.name}
//                             value={color}
//                             aria-label={color.name}
//                             className={({ focus, checked }) =>
//                               classNames(
//                                 color.selectedClass,
//                                 focus && checked ? "ring ring-offset-1" : "",
//                                 !focus && checked ? "ring-2" : "",
//                                 "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
//                               )
//                             }
//                           >
//                             <span
//                               aria-hidden="true"
//                               className={classNames(
//                                 color.class,
//                                 "h-8 w-8 rounded-full border border-black border-opacity-10"
//                               )}
//                             />
//                           </Radio>
//                         ))}
//                     </RadioGroup>
//                   </fieldset>
//                 </div>

//                 {/* Sizes */}
//                 <div className="mt-10">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-sm font-medium text-gray-900">Size</h3>
//                     <a
//                       href="/"
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//                     >
//                       Size guide
//                     </a>
//                   </div>

//                   <fieldset aria-label="Choose a size" className="mt-4">
//                     <RadioGroup
//                       value={selectedSize}
//                       onChange={setSelectedSize}
//                       className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
//                     >
//                       {sizes.map((size) => (
//                         <Radio
//                           key={size.name}
//                           value={size}
//                           disabled={!size.inStock}
//                           className={({ focus }) =>
//                             classNames(
//                               size.inStock
//                                 ? "cursor-pointer bg-white text-gray-900 shadow-sm"
//                                 : "cursor-not-allowed bg-gray-50 text-gray-200",
//                               focus ? "ring-2 ring-indigo-500" : "",
//                               "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
//                             )
//                           }
//                         >
//                           {({ checked, focus }) => (
//                             <>
//                               <span>{size.name}</span>
//                               {size.inStock ? (
//                                 <span
//                                   className={classNames(
//                                     checked
//                                       ? "border-indigo-500"
//                                       : "border-transparent",
//                                     focus ? "border" : "border-2",
//                                     "pointer-events-none absolute -inset-px rounded-md"
//                                   )}
//                                   aria-hidden="true"
//                                 />
//                               ) : (
//                                 <span
//                                   aria-hidden="true"
//                                   className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
//                                 >
//                                   <svg
//                                     className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
//                                     viewBox="0 0 100 100"
//                                     preserveAspectRatio="none"
//                                     stroke="currentColor"
//                                   >
//                                     <line
//                                       x1={0}
//                                       y1={100}
//                                       x2={100}
//                                       y2={0}
//                                       vectorEffect="non-scaling-stroke"
//                                     />
//                                   </svg>
//                                 </span>
//                               )}
//                             </>
//                           )}
//                         </Radio>
//                       ))}
//                     </RadioGroup>
//                   </fieldset>
//                 </div>

//                 <button
//                   onClick={handleCart}
//                   type="submit"
//                   className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 >
//                   Add to Cart
//                 </button>
//               </form>
//             </div>

//             <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
//               {/* Description and details */}
//               <div>
//                 <h3 className="sr-only">Description</h3>

//                 <div className="space-y-6">
//                   <p className="text-base text-gray-900">
//                     {products.description}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-10">
//                 <h3 className="text-sm font-medium text-gray-900">
//                   Highlights
//                 </h3>
//                 "\n" (1)ghghghghg
//                 <div className="mt-4">
//                   <ul className="list-disc space-y-2 pl-4 text-sm">
//                     {products.highlights &&
//                       products.highlights.map((highlight) => (
//                         <li key={highlight} className="text-gray-400">
//                           <span className="text-gray-600">{highlight}</span>
//                         </li>
//                       ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="mt-10">
//                 <h2 className="text-sm font-medium text-gray-900">Details</h2>

//                 <div className="mt-4 space-y-6">
//                   <p className="text-sm text-gray-600">
//                     {products.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }