import React from "react";
import { useRouter } from "next/router";
const Listings = () => {
  const router = useRouter();
  const listing = router.query.listings;
  return <div>{listing}</div>;
};

export default Listings;
