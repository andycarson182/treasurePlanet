
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Nodes($filter: TaskFilter) {
  tasks(filter: $filter) {
    nodes {
      id
      sourceLicensePlateId
      code
    }
  }
}
`;

class GetTaskId {
  async getTaskId(licensePlateId: any, status:string) {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "filter": {
              "sourceLicensePlateId": {
                "like": licensePlateId
              },
              "status": {
                "like": status
              }
            },
          },
        },
        {
          headers: headers,
        }
      );

      console.log('GraphQL query status:', response.status);

      const dataResponse = response.data;

      // Extract the first (and expected only) task ID
      const taskId: string | undefined = dataResponse.data.tasks.nodes[0]?.id;

      if (taskId) {
        // Log the task ID
        console.log("task ID:", taskId);
        return taskId; // Return the single taskId
      } else {
        console.warn("No task found with the given license plate id.");
        return null; // Return null or handle the case where no task is found
      }
    } catch (error: any) {
      console.error('GraphQL query failed:', error.response?.data || error.message);
      throw error;
    }
  }
}


export { GetTaskId };