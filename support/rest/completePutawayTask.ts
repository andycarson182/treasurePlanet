
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CompleteOneFFPutawayTask($input: CompletePutawayTaskInputDto!) {
  completeOneFFPutawayTask(input: $input) {
    id
    status
  }
}
`;

class CompletePutawayTask {

  async completePutawayTask(taskId: any) {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "id": taskId,
              "update": {
                "destinationBinId": "41cb35a7-533d-4576-b81f-659e0bf046ef",
                "quantity": "1",
                "completedInUnitOfMeasureId": "82eee6d0-0331-4362-b8f7-ffe889afb804"
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

export { CompletePutawayTask };