import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useRouter } from "next/router";
import { getMetadata, purchaseDataset } from "../../hooks/dataContract";
import { getExampleResponse } from "../../constants/api.constants";
import { useSigner } from "wagmi";
import { getWalletDetails } from "@/hooks/getAddress.hook";
import axios from "axios";
const ListingComponent = ({ contractAddress }) => {
    console.log(contractAddress);
    const router = useRouter();
    const [dataset, setDataset] = useState();
    const [provider, setProvider] = useState(null);
    const [sign, setSign] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataUrl, setdataUrl] = useState();
    // const params = useParams();
    // const { contractAddress } = params;

    const buyDataset = async (priceEVM) => {
        const result = await purchaseDataset(sign, contractAddress, priceEVM);
        const { data } = await axios.get()
        console.log(result);
    };
    useEffect(() => {
        console.log("object");
        const getSigner = async () => {
            const { signer } = await getWalletDetails();
            setSign(signer);
        };
        getSigner();
    }, []);
    async function getDatasetInfo() {
        try {
            console.log("hi");
            const res = await getMetadata(sign, contractAddress);
            console.log(res);
            const data = res?.split("|");
            console.log(data);
            setDataset(
                {
                    title: data[0],
                    description: data[1],
                    metadataurl: data[2],
                    priceWEI: data[3],
                    //priceEVM: data[3],
                    keywords: data[5],
                    createdAt: data[7],
                    purchases: data[8],
                } || {}
            );
            console.log(dataset)
        } catch (e) {
            console.error("error fetching record", e);
            let { message } = e;
            // setError(humanError(message))
            setDataset(getExampleResponse());
        }
    }

    useEffect(() => {
        console.log("hi");
        if (sign) {
            console.log("hi");
            const dataset = async () => {
                await getDatasetInfo();
            };
            dataset();
        } else {
            console.log("no signer");
        }
    }, [sign]);

    return (
        <div className="h-screen">
            {dataset && (
                <div className="centered card boxed mx-auto w-fit mt-12">
                    <p>Price: {dataset.priceWEI} WEI</p>
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <svg
                            className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                                clip-rule="evenodd"
                            ></path>
                            <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
                        </svg>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Wana get the dataset?
                        </h5>
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Name: {dataset.title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                            {dataset.description}
                        </p>
                        {dataset.priceEVM && <p>Price: {dataset.priceEVM} TFIL</p>}
                        <a
                            href={`/listings/${contractAddress}`}
                            className="inline-flex items-center text-blue-600 hover:underline"
                        >
                            Copy listing Link
                            <svg
                                className="w-5 h-5 ml-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                            </svg>
                        </a>
                        <br />
                        <div
                            href="#"
                            className="inline-flex items-center px-3 py-2 my-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 pointer"
                            onClick={() => {
                                buyDataset(dataset.priceWEI);
                            }}
                        >
                            Buy dataset!
                            <svg
                                aria-hidden="true"
                                className="w-4 h-4 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <hr />
                        {dataset.keywords &&
                            dataset.keywords.split(",").map((keyword) => {
                                return (
                                    <span className="inline-flex items-center px-3 py-0.5 mt-2 mr-2 text-sm font-medium leading-5 text-blue-800 bg-blue-100 rounded-full dark:bg-blue-700 dark:text-blue-100">
                                        {keyword}
                                    </span>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingComponent;
