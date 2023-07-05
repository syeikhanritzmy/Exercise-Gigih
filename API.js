import dotenv from 'dotenv';
import fetch from 'node-fetch';
const ENV = dotenv.config({
  path: './RapidAPI.env',
});
const { API_URL, API_KEY, API_HOST } = ENV.parsed;

const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/search/?q=anggi&type=albums&offset=0&limit=10`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Terjadi kesalahan saat mengambil data');
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const fetchDataAsync = async () => {
  try {
    const response = await fetch(
      `${API_URL}/search/?q=komang&type=tracks&offset=0&limit=1&numberOfTopResults=1`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error('ada yang salah saat pengambilan data.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchDataPromise, fetchDataAsync };
