import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
}) {
    //Push Item to REDUX
    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
        }
        dispatch(addToBasket(product));
    }

    const removeItemFromBasket = () => {
        // Remove the item from REDUX
        dispatch(removeFromBasket({ id }));
    };

    return (
        <div className = "grid grid-cols-5" >
        {/* Left Image Section */}
            <Image 
                src = {image}
                alt = "Product Image"
                height = {200}
                width = {200}
                objectFit = "contain"
            />
        {/* Middle description Section */}
            <div className = "col-span-3 mx-5">
                {/* TITLE */}
                <p>{title}</p>
                {/* To Display Rating(stars) */}
                <div className ="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                        <StarIcon className ="h-5 text-yellow-500"/>
                        ))}
                </div>
                {/* Description of product */}
                <p className = "text-xs my-2 line-clamp-3" >{description}</p>

                <Currency quantity ={price} currency = "GBP" />

                {hasPrime && (
                    <div className = "flex items-center space-x-2" >
                        <img
                            loading = "lazy" 
                            className = "w-12"
                            src = "https://links.papareact.com/fdw"
                            alt = "AmazonPrime logo"
                        />
                        <p className = "text-xs text-gray-500" >FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            {/* Right Side with Add and Remove Buttons */}
            <div className = "flex flex-col space-y-2 my-auto justify-self-end" >
                <button onClick = {addItemToBasket} className = "button" >Add to Basket</button>
                <button onClick = {removeItemFromBasket} className = "button" >Remove from Basket</button>
            </div>

        </div>
    )
}

export default CheckoutProduct;
