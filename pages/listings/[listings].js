import React from "react";
import { useRouter } from "next/router";

import { getWalletDetails } from "@/hooks/getAddress.hook";
import ListingComponent from "@/components/listing/ListingComponet";
const Listings = () => {
  const router = useRouter();
  const listing = router.query.listings;
  // const params = useParams();
  // const { contractAddress } = params;

  return (
    <div>
      {/* {listing} */}
      <ListingComponent contractAddress={listing} />
    </div>
  );
};

export default Listings;
