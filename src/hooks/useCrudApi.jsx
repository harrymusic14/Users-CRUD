import { useState, useEffect } from "react";
import axios from "axios";

export function useCrudApi(baseUrl) {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get(baseUrl)
          .then(response => setData(Array.isArray(response.data) ? response.data : []))
          .catch(error => console.error("Fetch Error:", error));
      }, [baseUrl]);
      

  const create = async (newItem) => {
    try {
      const response = await axios.post(baseUrl, newItem);
      setData(prevData => [...prevData, response.data]);
    } catch (error) {
      console.error("Create Error:", error.response?.data || error.message);
    }
  };

  const update = async (id, updatedItem) => {
    try {
      const response = await axios.put(`${baseUrl}${id}/`, updatedItem);
      setData(prevData => prevData.map(item => item.id === id ? response.data : item));
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`${baseUrl}${id}`);
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };
  

  return [data, { create, update, remove }];
}
