import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/client";
import { useState } from "react";



export default function Home( { products } ) {
  const [filteredProducts, setProducts] = useState(products);

    function filterProducts(searchText) {
        const matchedProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setProducts([...matchedProducts]);
    }

  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      
      {/* Header */}
      <Header onSearchValue={filterProducts} />

      <main className = " max-w-screen-2xl mx-auto ">
        {/* Banner */}
        <Banner />


        {/* Product Feed */}
        {filteredProducts.length > 0 ? (
                    <ProductFeed products={filteredProducts} />
                ) : (
                    <h1 className="text-center text-2xl py-4">
                        🙁 No matching products…
                    </h1>
        )}
        
      </main>
    </div>
    
  );
}

export async function getServerSideProps(context){
const session = await getSession(context);

  const products = await fetch("https://fakestoreapi.com/products")
  .then((res) => res.json()
  );
  return { 
    props: {
      products,
      session
    } ,
  };

  return {props: { products } };
}

//Get --->>>>   https://fakestoreapi.com/products