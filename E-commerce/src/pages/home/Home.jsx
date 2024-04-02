import React, { useContext } from 'react';
import Layout from "../../components/layout/Layout";
import MyContext from '../../context/data/MyContext';
import Hero from '../hero/Hero';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
import {useDispatch, useSelector} from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/Cartslice';

function Home(){
    const dispatch = useDispatch();
    const cartItem = useSelector((state)=> state.cart)
console.log(cartItem);
    const addCart = ()=>{
        dispatch(addToCart("shirt"))
    }

    const deleteCart =()=>{
        dispatch(deleteFromCart("shirt"))
    }
    const context = useContext(MyContext);
    console.log (context);

    return <>
    <Layout>
    <Hero/>
    <Filter/>
    <ProductCard/>
    <Testimonial/>
    </Layout>
    </> 
}

export default Home;