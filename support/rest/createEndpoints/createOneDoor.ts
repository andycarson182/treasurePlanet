
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneDoor($input: DoorCreateOneInput!) {
  createOneDoor(input: $input) {
    id
    code
  }
}
`;

class CreateOneDoor {

  async createAutomationDoor() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "door": {
                "code": "AUTOMATION DOOR FOR EDIT",
                "areaId": "09172e58-8dab-416b-a65f-37bca122cdf2",
                "binId": "fdb0b1be-4ed4-45e5-87fe-5529821ab1f4",
                "direction": "inbound",
                "x": 1,
                "y": 1,
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

export { CreateOneDoor };