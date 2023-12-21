import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChartFour from '../../components/ChartFour.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';
import React, { useState, useEffect } from 'react';
import { Route, Redirect, useNavigate } from "react-router-dom";

const ECommerce = () => {
  
  const navigate = useNavigate()

  useEffect(()=>{
    if ((localStorage.getItem("username") === null) && (localStorage.getItem("password")) === null) {
      navigate('/auth/signin')
      console.log('anda belum login')
    } else {
      console.log('anda sudah login')
    }
  }, [])

  return (
    <>
      {/* <div className="w-full">
        <CardOne />
      </div> */}

      <div className="mt-0 grid grid-cols-12 gap-4 md:mt-0 md:gap-6 2xl:mt-0 2xl:gap-7.5">
        <ChartOne />
        <ChartFour />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default ECommerce;
