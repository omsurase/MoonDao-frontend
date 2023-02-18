import AxiosJsInstance from "@/hooks/AxiosInstance";

const addFile = async (type, cid, name, orgAddress) => {
  console.log({ type, cid, name, orgAddress });
  const { data } = await AxiosJsInstance.post("/api/file/addFile", {
    type,
    name,
    cid,
    orgAddress,
  });
  if (data) {
    window.alert(data.message);
    return data;
  }
};

const getFiles = async (orgAddress) => {
  const { data } = await AxiosJsInstance.post("/api/file/getFiles", {
    orgAddress,
  });
  return data.files;
};

export { addFile, getFiles };
