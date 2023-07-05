import { fetchDataAsync, fetchDataPromise } from './API.js';

fetchDataPromise()
  .then((data) => {
    console.log('list lagu');
    data.albums.items.forEach(({ data }, index) => {
      console.log(
        `${index + 1} ${data.name} cover by ${
          data.artists.items[index]?.profile.name
        }`
      );
    });
  })
  .catch((error) => {
    console.log('terjadi kesalahan', error);
  });

async function fetchData() {
  try {
    const datas = await fetchDataAsync();
    const {
      name,
      artists: {
        items: [{ profile }],
      },
    } = datas.tracks.items[0].data;
    console.log(`judul lagu : ${name} `);
    console.log(`dinyanyikan  oleh : ${profile.name}`);
  } catch (error) {
    console.log('terjadi kesalahan', error);
  }
}

// fetchData();
