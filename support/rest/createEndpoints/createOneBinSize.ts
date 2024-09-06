
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneBinSize($input: BinSizeCreateOneInput!) {
  createOneBinSize(input: $input) {
    id
    code
  }
}
`;

class CreateOneBinSize {

  async createAutomationBinSize() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "binSize": {
                "code": "AUTOMATION BIN SIZE FOR EDIT",
                "label": "Automation bin size label",
                "description": "This is a bin size created by automation suite",
                "weightCapacityUomId": "e6c47257-c1d5-49f7-ac75-247a2147434e",
                "weightCapacity": 1,
                "distanceUomId": "863c4f2f-6ae3-4b0b-88dd-b14ffbf9d709",
                "depth": 12,
                "width": 13,
                "height": 14,
                "volumeCapacity": 2,
                "volumeCapacityUomId": "14834147-d4d9-440a-b916-9518c27f1368",
                "productHeightLimit": 12,
                "productLengthLimit": 10,
                "productWidthLimit": 11,
                "productLimitUomId": "863c4f2f-6ae3-4b0b-88dd-b14ffbf9d709",
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

export { CreateOneBinSize };