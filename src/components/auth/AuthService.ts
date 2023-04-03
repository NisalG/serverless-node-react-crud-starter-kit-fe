// Function to add the auth token to the request headers
export const addAuthTokenToHeaders = (headers: any) => {
  const authToken = sessionStorage.getItem("authToken");
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  return headers;
};

// export const isAuthenticated = (token: string): boolean => {
//   // Check if token is valid (e.g. not expired)
//   console.log('token in authService', token);
//   console.log('authService return value', token ? true : false);
  
//   // return token && token !== 'undefined';
//   return true;
// };
