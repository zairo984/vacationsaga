"use client";
import React, { FC, useEffect } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import axios from "axios";

export interface ListingStayPageProps {}

const ListingStayPage: FC<ListingStayPageProps> = () => {

  // const getProperties = async () => {
  //   const response = await axios.get('/api/properties');
  //   console.log("response: ",response?.data)
  // }

  // useEffect(() => {
  //   console.log('called useEffect');
  //   getProperties();
  // }, [])


  return <SectionGridFilterCard className="container pb-24 lg:pb-28" />;
};

export default ListingStayPage;
