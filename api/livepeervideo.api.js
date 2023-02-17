import axios from "axios";


const fetchAssets = async () => {
    try {
        const res = await axios.get('https://livepeer.studio/api/asset?limit=10&allUsers=true',

            {
                headers:
                    { Authorization: 'Bearer bf8c946f-2112-4226-bca7-075a2221564b' },
            },
        );
        const data = await res.data;
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export default fetchAssets;

