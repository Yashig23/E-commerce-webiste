import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../redux/Cartslice";
import MyContext from "../../context/data/MyContext";
import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { addToCart, deleteFromCart } from "../../redux/Cartslice";
import { useId } from "react";
import { toast } from 'react-toastify';

const Wishlist=()=>{
    // const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(MyContext)
  const { mode, loading, wishlist, products,product, deleteWishlistPro } = context

 const dispatch = useDispatch();
 // console.log(cartItems)
 const id= useId()

 // add to cart
 const addCart = (products) => {
     dispatch(addToCart(products))
     toast.success('add to cart');
 }


    return (
        <>
         <Layout>
      {wishlist.length > 0 ?<div className=" h-full pt-10">
              
                  <div className="mx-auto max-w-5xl px-6  md:space-x-6 xl:px-0">
                    
                    { wishlist.map((item) => {
                        return (
                            <div className="">
                          <div key={id} className="rounded-lg md:w-2/3">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                              <img src={item.image} alt="product-image" className="w-[150px] h-[150px] rounded-lg sm:w-40" />
                              <div className="sm:ml-4 sm:flex sm:w-full flex sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
                                </div>
                                <div>
                                <button  onClick={()=>addCart(item)} className=" ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Add To Cart
                                </button>
                                </div>
                                <div>
                                    <button onClick={()=>deleteWishlistPro(item)} className=" ml-auto text-white bg-transparent border  border-gray-50 py-2 px-6 focus:outline-none  rounded"> Delete</button>
                                    </div>
                              </div>
                              
                            </div>
                          </div>
                          </div>
                        )
                      })
                    }
                  </div>
                
              
            
          </div>
        :     <h2 className=' text-center tex-2xl text-white'>Nothing</h2>}
        
          
        
       
        

    </Layout>
        </>
    )
}

export default Wishlist;