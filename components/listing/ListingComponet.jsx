import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useRouter } from "next/router";
import { getMetadata } from "../../hooks/dataContract";
import { getExampleResponse } from "../../constants/api.constants";
import { useSigner } from "wagmi";
import { getWalletDetails } from '@/hooks/getAddress.hook';

const ListingComponet = ({ contractAddress }) => {

    console.log(contractAddress)
    const router = useRouter();
    const [dataset, setDataset] = useState();
    const [provider, setProvider] = useState(null);
    const [sign, setSign] = useState(null);
    const [loading, setLoading] = useState(false);
    // const params = useParams();
    // const { contractAddress } = params;

    useEffect(() => {
        console.log("object")
        const getSigner = async () => {
            const { signer } = await getWalletDetails();
            setSign(signer);
        }
        getSigner();
    }, [])
    async function getDatasetInfo() {
        try {

            console.log("hi")
            const res = await getMetadata(sign, contractAddress);
            setDataset(res?.data || {});
        } catch (e) {
            console.error("error fetching record", e);
            let { message } = e;
            // setError(humanError(message))
            setDataset(getExampleResponse());
        }
    }

    useEffect(() => {
        console.log("hi")
        if (sign) {
            console.log("hi")
            const dataset = async () => {
                await getDatasetInfo();
            }
            dataset()
        }
        else {
            console.log("no signer")
        }
    }, [sign]);

    return (
        <div>
            {dataset && (
                <div className="centered card boxed">
                    {console.log(dataset)}
                    <h2>{dataset.title}</h2>
                    <p>{dataset.description}</p>
                    {dataset.createdAt && <p>Listed at: {dataset.createdAt}</p>}
                    {/* {!isNaN(dataset.purchases) && <p>Purchases: {dataset.purchases}</p>} */}
                    {dataset.priceEVM && <p>Price: {dataset.priceEVM} TFIL</p>}

                    <p>Keywords: {dataset.keywords}</p>
                    <br />
                </div>
            )}
        </div>
    );
};

export default ListingComponet
