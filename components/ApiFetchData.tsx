import fetchModelPrediction from '../data_scripts/FetchData';
import { useState } from 'react';


//my functional component 
const ApiFetchData = () => {
  //stores the users input,prediction result, whether the data is currently being fetched and the error messages
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Allow string or null
  
  //updates the input state
  //e is the info about the event
  const handleInputChange = (e:any) => {
    setInput(e.target.value);
  };
  
  //updates the loading state and the error massage
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
  
  //attempts the get the prediction from the fetchModelPrediction
  try {
    //calls the fn within the current value and waits for the response
      const result = await fetchModelPrediction({ input });
        setPrediction(result);
      } catch (error) {
        setError('Error fetching prediction');
      }
      //this occurs either way 
      finally {
        setLoading(false);
      }
  };
  return {
      input,
      prediction,
      loading,
      error,
      handleInputChange,
      handleSubmit,
  };
}

export default ApiFetchData;