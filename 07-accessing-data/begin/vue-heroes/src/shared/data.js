import * as axios from 'axios';

import { format } from 'date-fns';
import { inputDateFormat } from './constants';

import { API } from './config';

const getHeroes = async function() {
  try {
  // can also use .get
  const response = await axios.get(`${API}/heroes.json`);
  let data = parseList(response);
  // transform the response - we want the data in the response, not the response itself. Also need to parse dates. Interrogate the data.
  // so map through the array of heroes, and for each hero, transform necessary data:
  const heroes = data.map(h => {
    h.originDate = format(h.originDate, inputDateFormat);
    return h;
  });
    return heroes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = {};
  }
  return list;
};

export const data = {
  getHeroes,
};
