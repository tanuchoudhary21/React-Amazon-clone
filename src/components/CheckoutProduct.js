import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket, removeGroupedFromBasket } from '../slices/basketSlice';

function CheckoutProduct(props) {
    //Push Item to REDUX
    const dispatch = useDispatch()

    const id = props.id;
    const title = props.title;
    const rating = props.rating;
    const price = props.price;
    const description = props.description;
    const category = props.category;
    const image = props.image;
    const hasPrime = props.hasPrime;
    const quantity = props.quantity;

    const total = price * quantity;

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
        // Sending the product via an action to the redux store (= basket "slice")
        dispatch(addToBasket(product));
        
    }

    const removeItemFromBasket = () => {
        // Remove the item from REDUX
        dispatch(removeFromBasket({ id }));
    };

    function removeGroupFromBasket() {
        dispatch(removeGroupedFromBasket({ id }));
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

                {quantity} ×<Currency quantity ={price} currency = "GBP" />

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
                {/* <button onClick = {addItemToBasket} className = "button" >Add to Basket</button> */}
                <div className = "flex justify-between" >
                <img 
                    alt = "increase" 
                    // className = "" 
                    src = "https://image.flaticon.com/icons/png/512/1828/1828926.png"
                    height = {30}
                    width = {30}
                    onClick = {addItemToBasket}
                    // onClick = {() => onIncreaseQuantity(product)}    
                />

                <p>Quantity: <span className = "font-bold" >{quantity}</span> </p>

                <img 
                    src="https://image.flaticon.com/icons/png/512/992/992683.png" 
                    alt="decrease" 
                    height = {30}
                    width = {30}
                    onClick = {removeItemFromBasket}
                    />

                </div>
                <button onClick = {removeGroupFromBasket} className = "button" >Remove from Basket</button>
            </div>

        </div>
    )
}

export default CheckoutProduct;
