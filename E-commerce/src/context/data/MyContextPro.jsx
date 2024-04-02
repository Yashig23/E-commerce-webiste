import React, { useEffect, useState } from 'react';
import MyContext from "./MyContext";
import { Timestamp, deleteDoc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { collection } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';

function MyContextPro(props){
 
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false)
    const toggleMode=()=>{
        if(mode ==='light'){
            setMode('dark'),
            document.body.style.backgroundColor = "rgb(17,24,39)"
        }
        else{
            setMode('light'),
            document.body.style.backgroundColor = "white"
        }
    }

    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);

    // const navigate1 = useNavigate();

    const [products, setProducts] = useState({
        title: null,
        price: null,
        image: null,
        description: null,
        category: null,
        quantity: null,
        id: Math.floor(Math.random() * 1000000).toString(), 
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            'en-US',
            {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            }
        )
    })

    const addProduct= async()=>{
        if(products.title == null || products.price == null || products.image == null || products.category == null || products.description == null ){
            toast.error('All fields are required')
        }
        else{
       
        try{
            setLoading(true);
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products)
            toast.success("Added product successfully");
            getProductData();
            setLoading(false);
            console.log("Document written with ID: ", productRef.id)
            naviagteFun();
        }catch(error){
            console.log(error)
            toast.error("Products didnt added")
            setLoading(false)
          
        }
    }
    }

    const naviagteFun=()=>{
   setTimeout(()=>{  window.location.href = '/dasboard';}, 1000)
    }

    const [product, setProduct] = useState([]);

    const editItem=()=>{
        setProducts(products);
    }

    const updateProducts=async(products)=>{
        setLoading(true)
      try{
         await setDoc(doc(fireDB, 'products', products.id), products)
         toast.success("Updated successfully")
         setLoading(false);
         getProductData();
         naviagteFun();
      }
      catch(e){
        console.log(e);
        toast.error("Update is failed")
        setLoading(false);
      }
    }

    const deleteProducts=async(products)=>{
        setLoading(true)
        console.log(products.id)
        console.log(products);
        try {
            await deleteDoc(doc(fireDB, 'products', products.id));
            toast.success("Deletion Successfully completed");
            setLoading(false);
            getProductData();
            naviagteFun();
        }
        catch(e){
           console.log(e);
           toast.error("deletion is failed")
           setLoading(false)
        }
    }

    const getProductData = async()=>{
         setLoading(true)

         try{
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) =>{
                let productArray = [];
                QuerySnapshot.forEach((doc)=>{
                    productArray.push({...doc.data(), id: doc.id});
                });
                setProduct(productArray);
                setLoading(false);
            });
            return ()=> data;
         }catch(error){
            console.log(error);
            setLoading(false)
         }
    }

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
      setLoading(true)
      try {
        const result = await getDocs(collection(fireDB, "order"))
        const ordersArray = [];
        result.forEach((doc) => {
          ordersArray.push(doc.data());
          setLoading(false)
        });
        setOrder(ordersArray);
        console.log(ordersArray)
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    const [user, setUser] = useState([]);

    const getUserData = async () =>{
        setLoading(true)
        try{
            const result = await getDocs(collection(fireDB, 'user'))
            const userArray = [];
            result.forEach((doc)=>{
                userArray.push(doc.data());
                setLoading(false);
            });
            setUser(userArray);
            console.log(userArray);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    const [wishlist, setWishlist] = useState([]);

    const getWishlistData=async()=>{
        setLoading(true)
        try{
            const result = await getDocs(collection(fireDB, 'wishlist'))
            const wishlistArray = [];
            result.forEach((doc)=>{
            wishlistArray.push(doc.data());
            setLoading(false);
        });
        setWishlist(wishlistArray);
        console.log(wishlistArray);

        }catch(e){
            console.log(e)
            toast.error(e);
        }

    }

    const deleteWishlistPro=async(product)=>{
        console.log(product);
        console.log(product.id);
        setLoading(true)
    
        try {
            await deleteDoc(doc(fireDB, 'wishlist', product.id));
            toast.success("Deletion Successfully completed");
            setLoading(false);
            getProductData();
            naviagteFun();
        }
        catch(e){
           console.log(e);
           toast.error("deletion is failed")
           setLoading(false)
        }
    }

    const [searchKey, setSearchKey] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterPrice, setFilterPrice] = useState('');

    useEffect(()=>{
        getProductData();
        getOrderData();
        getUserData();
        getWishlistData();
    }, [])
 
    return (
    <MyContext.Provider value={{mode, toggleMode, loading, filterType,deleteWishlistPro, setFilterType,wishlist, setWishlist, setLoading,searchKey, setSearchKey,filterPrice, setFilterPrice, addProduct, product, user,deleteProducts, products, setProducts, editItem, updateProducts, order}}>
        {props.children}
    </MyContext.Provider>
    )

}
export default MyContextPro;