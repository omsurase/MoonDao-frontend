import AxiosJsInstance from "@/hooks/AxiosInstance";

const addOrganization = async (orgName, orgAddress, hostAddress, hostName) => {
  try {
    const response = await AxiosJsInstance.post("api/org/addOrg", {
      orgName: orgName,
      orgAddress: orgAddress,
      hostAddress: hostAddress,
      hostName: hostName,
    });
    if (response.status === 200) {
      alert("Organization created successfully");
    } else {
      alert("Failed to create organization");
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrganization = async (orgName) => {
  try {
    const response = await AxiosJsInstance.post("api/org/getOrg", {
      orgName: orgName,
    });
    if (response.status === 200) {
      return response.data.org;
    } else {
      alert("Failed to fetch organizations");
    }
  } catch (error) {
    console.log(error);
  }
};

const addMember = async (orgName, memberName, memberAddress) => {
  try {
    const response = await AxiosJsInstance.post("api/org/addMember", {
      orgName: orgName,
      memberName: memberName,
      memberEthAddress: memberAddress,
    });
    if (response.status === 200) {
      alert("Member added successfully");
    } else {
      alert("Failed to add member");
    }
  } catch (error) {
    console.log(error);
  }
};

export { addOrganization, getOrganization, addMember };
