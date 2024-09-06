
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneArea($input: AreaCreateOneInput!) {
  createOneArea(input: $input) {
        id
    code
    name
    __typename
  }
}
`;

class CreateArea {

  async createAutomationArea(areaCode:string) {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "area": {
                "name": "Automation Area",
                "code": areaCode,
                "description": "This is an area created by automation suite",
                "status": "inactive",
                "sapStorageLocationPlantId": null,
                "targetTemperature": 4.444444444444445,
                "entryPoint": false,
                "exitPoint": false,
                "type": "perm",
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

export { CreateArea };