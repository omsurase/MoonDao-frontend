import React from "react";
import { useSigner } from "wagmi";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useRouter } from "next/router";
import ListingComponet from "@/components/listing/listingComponet";

import { getWalletDetails } from "@/hooks/getAddress.hook";
const Listings = () => {
  const { data: signer } = useSigner();
  const router = useRouter();
  const listing = router.query.listings;
  const [dataset, setDataset] = useState();
  const [provider, setProvider] = useState(null);
  //const [signer, setSigner] = useState(null);
  const [loading, setLoading] = useState(false);
  // const params = useParams();
  // const { contractAddress } = params;

  return (
    <div>
      {listing}
      <ListingComponet contractAddress={listing} />
    </div>
  );
};

export default Listings;
