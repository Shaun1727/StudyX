import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Small-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiConnector'
import {categories} from "../../services/apis"
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
// require("dotenv").config()
const NavBar = () => {
    const {user} = useSelector((state)=>(state.profile))
    const {token}= useSelector((state)=>(state.auth))
    const {totalItems} = useSelector((state)=>(state.cart))
    const location = useLocation();
    function matchRoute(route){
        return matchPath({path:route},location.pathname)
    }
    const [subLinks,setSubLinks] = useState([])

    async function fetchSubLinks(){
        // console.log(process.env.REACT_APP_BASE_URL)
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API)
            // console.log("SubLinks are ",result.data.data)
            setSubLinks(result.data.data)
            // console.log(result)
        }
        catch(err){
            console.log("Could not fetch category list")
        }
    }
    useEffect(()=>{
        fetchSubLinks()
    },[])
    // const subLinks = [
    //     {
    //         title: "python",
    //         link:"/catalog/python"
    //     },
    //     {
    //         title: "web dev",
    //         link:"/catalog/web-development"
    //     },
    // ];
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to="/">
              <div className="flex">
                 <img src={Logo} alt="" className="object-contain" />
                 <h2 className="text-2xl font-semibold text-white ml-2 mt-1">StudyX</h2>
              </div>
            </Link>
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>{
                            return (
                                <li key={index}>
                                    {
                                        link.title ==="Catalog"?
                                        (<div className='flex gap-2 group relative items-center'>
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle/>
                                            <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'>
                                                </div>
                                                {
                                                    subLinks.length?(
                                                    subLinks.map((sublink)=>(
                                                        <Link className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' to={`/catalog/${sublink.name
                                                            .split(" ")
                                                            .join("-")
                                                            .toLowerCase()}`} key={index}>
                                                            <p>{sublink.name}</p>
                                                        </Link>
                                                    ))):                                                  
                                                    (<div>
                                                    </div>)
                                                }
                                            </div>
                                        </div>):(
                                            <div>
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}`}>{link.title}</p>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            {/* Login/SignUp/Cart/Profile dashboard */}
            <div className='flex flex-row gap-4 items-center '>
                {
                    user && user?.accountType!=="Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                             <AiOutlineShoppingCart className='text-2xl text-richblack-100'/>
                            <span className='absolute -top-1 -right-2 bg-green-600 w-5 h-5 flex justify-center items-center animate-bounce text-xs rounded-full text-white'>
                                <p> {
                              totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                                 }
                            </p>
                            </span>
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to="/login">
                            <button className='text-richblack-100 bg-richblack-800 border border-richblack-700 rounded-md px-[12px] py-[8px]'>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='text-richblack-100 bg-richblack-800 border border-richblack-700 rounded-md px-[12px] py-[8px]'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token!==null && (
                        <ProfileDropdown/>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default NavBar