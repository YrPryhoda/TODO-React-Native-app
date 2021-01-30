export class Http {

  static requestHandler = async (request) => {
    try {
      return await request()
    } catch (error) {
      throw error;
    }
  }

  static HEADERS = {
    'Content-Type': 'application/json'
  };

  static URL = 'https://rn-todo-app-fcff3-default-rtdb.europe-west1.firebasedatabase.app';

  static async get(url) {
    return await Http.requestHandler(() => request(url))
  }

  static async post(url, data = {}) {
    return await Http.requestHandler(() => request(url, 'POST', data))

  }

  static async delete(url) {
    return await Http.requestHandler(() => request(url, 'DELETE'));
  }

  static async patch(url, data = {}) {
    return await Http.requestHandler(() => request(url, 'PATCH', data));
  }
}

async function request(url, method = 'GET', data) {

  const httpUrl = `${Http.URL}${url}`;

  const config = {
    method,
    headers: Http.HEADERS,
  };

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data)
  }

  const response = await fetch(httpUrl, config);

  return await response.json();
}