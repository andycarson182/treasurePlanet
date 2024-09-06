
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneEquipmentType($input: EquipmentTypeCreateOneInput!) {
  createOneEquipmentType(input: $input) {
    id
    code
  }
}
`;

class CreateOneEquipmentType {

  async createAutomationEquipmentType() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "equipmentType": {
                "code": "AUTOMATION EQUIPMENT TYPE FOR EDIT",
                "label": "Automation equipment type label",
                "description": "This is a equipment type added by automation suite",
                "weightMax": 2,
                "weightUOMId": "e6c47257-c1d5-49f7-ac75-247a2147434e",
                "heightMax": 50,
                "heightMin": 2,
                "heightUOMId": "863c4f2f-6ae3-4b0b-88dd-b14ffbf9d709",
                "volumeMax": 10,
                "volumeUOMId": "eee3639b-e7cd-4a8c-a233-65d7f7255197",
                "cost": 12,
                "currency": "USD",
                "velocity": 2,
                "verticalVelocity": 2,
                "velocityUOMId": "dfbe2de1-064b-46b5-985d-f4ba11abeb8d",
                "mobility": "dynamic"
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

export { CreateOneEquipmentType };