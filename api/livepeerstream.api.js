import axios from "axios";


const fetchStream = async () => {
    try {
        const res = await axios.get('https://livepeer.studio/api/stream/a2fb36d1-f219-4d1e-9b95-6f039aac876b/sessions?record=1',

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


export default fetchStream;

