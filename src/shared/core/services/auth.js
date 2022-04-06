export const setToken = (token) => {
  localStorage.setItem('ACCESS-TOKEN', token);
};

export const setRefreshToken = (token) => {
  localStorage.setItem('REFRESH-TOKEN', token);
};

export const removeToken = () => {
  localStorage.removeItem('ACCESS-TOKEN');
};

export const getToken = () => localStorage.getItem('ACCESS-TOKEN');

export const getRefreshToken = () => localStorage.getItem('REFRESH-TOKEN') || '';

export const setDataRegister = (data: any) => localStorage.setItem('DATA-REGISTER', JSON.stringify(data));

export const getDataRegister = () => {
  const data = localStorage.getItem('DATA-REGISTER');
  return data ? JSON.parse(data) : null;
};

export const removeDataRegister = () => localStorage.removeItem('DATA-REGISTER');
