import React from 'react'
import { useContext } from 'react'
import MyContext from '../../../context/data/MyContext';

function UpdateProduct() {

    const context = useContext(MyContext);
    const { product, products, updateProducts, setProducts} = context;
    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            value={products.title}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                            onChange={(e)=>setProducts({...products, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <input type="text"
                          value={products.price}
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                            onChange={(e)=>setProducts({...products, price: e.target.value})}
                        />
                    </div>
                    <div>
                        <input type="text"
                          value={products.image}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                            onChange={(e)=>setProducts({...products, image: e.target.value})}
                        />
                    </div>
                    <div>
                        <input type="text"
                          value={products.category}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                            onChange={(e)=>setProducts({...products, category: e.target.value})}
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="10" name='title'
                         value={products.description}
                         onChange={(e)=>setProducts({...products, description: e.target.value})}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'>
                                

                       </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                        onClick={()=>updateProducts(products)}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct