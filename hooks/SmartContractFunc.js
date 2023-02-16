import { ethers } from "ethers";
import contract from "../contracts/Squad.json";
import * as PushAPI from "@pushprotocol/restapi";
import AxiosJsInstance from "./AxiosInstance";
import { getSigner, getWalletDetails } from "./getAddress.hook";
import { addOrganization } from "@/api/org.api";
import { addEmployeeToTeam, addTeam } from "@/api/team.api";

// create function to deploy contract
export const deployContract = async (orgName, hostName) => {
  const {address, signer} = await getWalletDetails();
  try {
    const factory = new ethers.ContractFactory(
      contract.abi,
      contract.bytecode,
      signer
    );
    console.log("in");
    const contractRes = await factory.deploy(orgName);
    await contractRes.deployed();
    await addOrganization(orgName, contractRes.address, address, hostName);
    // localStorage.setItem("contractAddress", contractRes.address);
    console.log(contractRes.address);
    return contractRes;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getOrganizationDetails = async () => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      provider
    );
    // call getOrgDetails function
    const orgDetails = await contractInstance.getOrgDetails();
    return orgDetails;
  } catch (error) {
    console.log(error);
  }
};

export const joinOrganisation = async (orgAddress) => {
  try {
    const contractInstance = new ethers.Contract(
      orgAddress,
      contract.abi,
      signer
    );
    const userAddress = await signer.getAddress();
    const tx = await contractInstance.isEmployee(userAddress);
    if (tx === true) {
      localStorage.setItem("contractAddress", orgAddress);
    } else {
      alert("You are not an employee of this organisation");
    }
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to add employee to organisation
export const addEmployee = async (employeeAddress, employeeName) => {
  try {
    console.log("contract address", localStorage.getItem("contractAddress"));
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.addEmployee(
      employeeAddress,
      employeeName
    );
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `New Message`,
        body: `Congtratulations,${employeeName}! You have been added to a new organisation.Sign the files in HR section to get started.`,
      },
      payload: {
        title: `New Message`,
        body: `Congtratulations,${employeeName}! You have been added to a new organisation.Sign the files in HR section to get started.`,
        cta: "",
        img: "",
      },
      recipients: employeeAddress, // recipient address
      channel: "0x3d6e6678E43ecd302867EE0c92bcBF2Fd6C60239", // your channel address
      env: "staging",
    });
    console.log(apiResponse);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to create a group
export const createGroup = async (groupName, orgAddress, myName, myEthAddress, task) => {
  const {address, signer} = await getWalletDetails();
  try {
    const contractInstance = new ethers.Contract(
      orgAddress,
      contract.abi,
      signer
    );
    const tx = await contractInstance.createGroup(groupName);
      const response = addTeam(orgAddress, groupName, task, myEthAddress, myName);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to add employee to group
export const addEmployeeToGroup = async (groupName, employeeAddress, orgAddress, employeeName) => {
  const {address, signer} = await getWalletDetails();
  try {
    const contractInstance = new ethers.Contract(
      orgAddress,
      contract.abi,
      signer
    );
    const tx = await contractInstance.addEmployeeToGroup(
      groupName,
      employeeAddress
    );

    await tx.wait();
    await addEmployeeToTeam(groupName, employeeAddress, orgAddress, employeeName);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to get all employees
export const getAllEmployees = async () => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.getEmployees();
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to get all employees in a group
export const getEmployeesInGroup = async (groupName) => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.getEmployeesByGroup(groupName);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// function to get all groups
export const getAllGroups = async () => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    console.log(typeof contractInstance.getGroupNames);
    const tx = await contractInstance.getGroupNames();
    return tx;
  } catch (error) {
    console.log(error);
  }
};

export const getFilesByGroup = async (groupName) => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.getFilesByGroup(groupName);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

export const isPublicKeySet = async () => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const userAddress = await signer.getAddress();
    const tx = await contractInstance.isPublicKeySet(userAddress);
    return tx;
  } catch (error) {
    console.log(error);
  }
};

export const lolFunc = async () => {
  try {
    const contractInstance = new ethers.Contract(
      localStorage.getItem("contractAddress") || "",
      contract.abi,
      signer
    );
    const tx = await contractInstance.addEmployeePublicKey(
      "0xfff1cb9e8ada37fe9efa63fe3f1dc2b91a12fa4fcf44b17b38168f648bb8286c"
    );
    return tx;
  } catch (error) {
    console.log(error);
  }
};

// send notification via push protocol
