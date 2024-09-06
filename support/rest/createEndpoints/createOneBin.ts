
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneBin($input: BinCreateOneInput!) {
  createOneBin(input: $input) {
    code
    id
  }
}
`;

class CreateOneBin {

  async createAutomationBin(binCode:string) {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "bin": {
                "binSizeId": "a22ad3e5-97e7-4ad7-b3d4-166ae1015c3a",
                "code": binCode,
                "areaId": "09172e58-8dab-416b-a65f-37bca122cdf2",
                "aisleId": null,
                "aisleColumnId": null,
                "level": 1,
                "x": 1,
                "y": 1,
                "lastCount": "2024-01-01T00:00:00.000-06:00",
                "warehouseId": warehouseId
              }
            }
          }
        },
        {
          headers: headers,
        }
      );

      console.log('GraphQL mutation status:', response.status);
      console.log('GraphQL mutation successful response:', response.data);

    } catch (error: any) {
      console.error(error);
      console.error('GraphQL mutation failed:', error.response.data);
      throw error;
    }
  }

}

export { CreateOneBin };