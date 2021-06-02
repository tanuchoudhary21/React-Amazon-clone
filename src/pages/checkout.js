import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectItems , selectTotal } from "../slices/basketSlice";
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from "react-currency-formatter";
import { groupBy } from "lodash";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
    const items = useSelector(selectItems);
    const [session] = useSession();
    const total = useSelector(selectTotal);

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        // Call the backend to create a checckout session.... 
        const checkoutSession = await axios.post('/api/create-checkout-session' , 
        {
            items: items,
            email: session.user.email
        })

        // Redirect user/customer to stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });

        if(result.error){
            alert(result.error.message);
        }
    };

    const groupedItems = Object.values(groupBy(items, "id"));

    return (
        <div className = "bg-gray-100">
            <Header/>
            <main className = "lg:flex max-w-screen-xl mx:auto">
            {/* LEFT SECTION */}
            <div className = "flex-grow m-5 shadow-sm">
                <Image
                    src = "https://links.papareact.com/ikj"
                    alt = ""
                    width = {1020}
                    height = {250}
                    objectFit = "contain"
                />
                <div className = "flex flex-col p-5 space-y-10 bg-white">
                    <h1 className = "text-3xl border-b pb-4">
                        { items.length === 0 ? 'Your Amazon Basket is Empty' : 'Your Amazon Order' }
                    </h1>

                    <TransitionGroup>
                            {groupedItems.map((group, i) => (
                                <CSSTransition
                                    key={group[0].image}
                                    timeout={500}
                                    classNames="item">
                                    <CheckoutProduct
                                        id={group[0].id}
                                        title={group[0].title}
                                        rating={group[0].rating}
                                        price={group[0].price}
                                        description={group[0].description}
                                        category={group[0].category}
                                        image={group[0].image}
                                        hasPrime={group[0].hasPrime}
                                        quantity={group.length}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>

                    {/* {items.map((item,i) => (
                        <CheckoutProduct 
                            key = {i} //NOT THE BEST WAY TO DO USE INDEX AS UNIQUE KEY
                            id = {item.id}
                            title = {item.title}
                            price = {item.price}
                            description = {item.description}
                            category = {item.category}
                            image = {item.image}
                            hasPrime = {item.hasPrime}
                            rating = {item.rating}
                        />
                    ))} */}
                </div>
            </div>
            
            {/* RIGHT SECTION */}
            <div className = "flex flex-col bg-white p-10 shadow-md">
                {items.length > 0 && (
                    <>
                        <h2 className = "whitespace-nowrap">
                            Subtotal ({ items.length  } items): {" "}
                            <span className = "font-bold">
                                <Currency quantity ={total} currency = "GBP" />
                            </span>
                        </h2>

                        <button
                            role = "link"
                            onClick = {createCheckoutSession}
                            disabled={!session}
                            className={`button mt-2 ${
                                !session &&
                                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed hover:from-gray-300"
                            }`}>
                            {!session
                                ? "Sign in to checkout"
                                : "Proceed to checkout"}
                        </button>

                    </>
                )}
            </div>
            </main>
        </div>
    )
}

export default checkout;
