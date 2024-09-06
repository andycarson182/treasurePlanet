
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneEquipmentModel($input: EquipmentModelCreateOneInput!) {
  createOneEquipmentModel(input: $input) {
    id
    code
  }
}
`;

class CreateOneEquipmentModel {

  async createAutomationEquipmentModel() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "equipmentModel": {
                "label": "Automation equipment model label",
                "equipmentTypeId": "c330d0ef-79ee-4fdc-9161-f3fd2f881178", // This needs to be updated if reseeding env
                "description": "This is a equipment model added by automation suite",
                "code": "AUTOMATION EQUIPMENT MODEL FOR EDIT"
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

export { CreateOneEquipmentModel };