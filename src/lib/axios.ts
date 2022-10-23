import Axios from 'axios';
import { getBaseApi } from 'src/utils/DataUtils'

export const axios = Axios.create({
  baseURL: getBaseApi(null)
});