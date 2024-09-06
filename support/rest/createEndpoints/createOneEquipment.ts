
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneEquipmentItem($input: EquipmentCreateOneInput!) {
  createOneEquipmentItem(input: $input) {
    code
    id
  }
}
`;

class CreateOneEquipment {

  async createAutomationEquipment() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "equipmentItem": {
                "code": "AUTOMATION EQUIPMENT FOR EDIT",
                "label": "Automation equipment label",
                "description": "This is a equipment added by automation suite",
                "equipmentModelId": "7749d729-9f85-4d1f-be4f-e9427b36a506",
                "status": "planned",
                "tagId": "automationTagId182",
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

export { CreateOneEquipment };