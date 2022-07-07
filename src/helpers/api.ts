export const API_URL = 'https://xonnected.herokuapp.com'

function authHeader(){
  let accessToken: string | null = localStorage.getItem('accessToken');
  if(typeof(accessToken) === 'string') accessToken = JSON.parse(accessToken);
  if(accessToken){
    return {
        'Authorization': 'Bearer ' + accessToken
    };
  }
  else{
      return {};
  }
}

async function makeRequest(url: string, requestOptions: any){
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data;
};

async function get(url: string){
  const options = {
    method: 'GET',
    headers: authHeader()
  }
  const fullUrl = API_URL + '/' + url
  const data = await makeRequest(fullUrl, options)
  return data
}

async function post(url: string, body: any){
  const token = authHeader()
  const options = {
    method: 'POST',
    headers: { ...token, 'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
  const fullUrl = API_URL + '/' + url
  const data = await makeRequest(fullUrl, options)
  return data
}

async function del(url: string, body: any){
  const token = authHeader()
  const options = {
    method: 'DELETE',
    headers: { ...token, 'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
  const fullUrl = API_URL + '/' + url
  const data = await makeRequest(fullUrl, options)
  return data
}

async function put(url: string, body: any){
  const token = authHeader()
  const options = {
    method: 'PUT',
    headers: { ...token, 'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
  const fullUrl = API_URL + '/' + url
  const data = await makeRequest(fullUrl, options)
  return data
}

export const api = {
  get,
  post,
  put,
  del
}