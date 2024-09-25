import axios from 'axios';

//a function that will retrieve data for the ui
const fetchModelPrediction = async (inputData: any) => {
    const endpoint = 'https://us-south.ml.cloud.ibm.com/ml/v4/deployments/5a0739eb-3c56-4c54-b3f1-c52e19d12851/predictions?version=2021-05-01'; // Replace with your model's endpoint
    const apiKey = 'TgQx7CnZr2viioJv0sNevkz4c6DpnSZVnlIty2nijf-G';

    try{
      //a http post request using axios to the specified endpoint
        const response = await axios.post(endpoint, inputData,{
          
          //headers for the request
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          });
          return response.data;
    }catch(error){
        console.log("Error fetching the prediction", error);
        throw error;
    }
}

export default fetchModelPrediction;