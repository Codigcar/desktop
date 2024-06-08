import { exec } from 'child_process';

// const baseUrl = 'http://localhost:3000/api';
const baseUrl = 'https://tesis-pry-api.azurewebsites.net/api';

export const fetchCustom = async (
  endpoint: string,
  data: any = {},
  method: string = 'GET'
) => {
  const url = `${baseUrl}${endpoint}`;

  try {
    if (method === 'GET') {
      const resp = await fetch(url, {
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });
      const fetchBody = await resp.json();
      return fetchBody;
    } else {
      let resp = await fetch(url, {
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      let fetchBody;
      try {
        fetchBody = await resp.json();
      } catch {
        resp = await fetch(url, {
          method,
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        fetchBody = await resp.text();
      }

      return fetchBody;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
