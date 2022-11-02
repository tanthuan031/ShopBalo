import axiosClient from '../../axiosClient';
import { concatQueryString } from '../../../utils/concatQueryString';
// import { getCookies } from '../Auth';

// export const configHeadersAuthenticate = () => {
//   const token = getCookies('token');
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

export const getAllSlider = async () => {
  const url = '/api/client/slider';

  const response = await axiosClient.get(url);

  if (response.status === 200) {
    return response.data;
  } else {
    return 401;
  }
};

export const getAllCategory = async () => {
  const url = '/api/client/category';

  const response = await axiosClient.get(url);

  if (response.status === 200) {
    return response.data;
  } else {
    return 401;
  }
};

export const getAllProducts = async ({ sell, sort } = {}) => {
  const url = '/api/client/product';
  const queryString = [];
  if (sell) queryString.push(`sell=${sell}`);
  if (sort && sort.length > 0) queryString.push(`sort[id]=${sort}`);

  const final_url = concatQueryString(queryString, url);
  const response = await axiosClient.get(final_url);

  if (response.status === 200) {
    return response.data;
  } else {
    return 401;
  }
};