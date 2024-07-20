import React, { FC } from "react";
import SectionGridHasMap from "@/app/(stay-listings)/SectionGridHasMap"; // Ensure this path is correct

export interface ListingStayMapPageProps {}

const ListingStayMapPage: FC<ListingStayMapPageProps> = () => {
  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap />
    </div>
  );
};

export default ListingStayMapPage;