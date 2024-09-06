
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../utilities/tysonFDQAAuth'

const headers = {
    'Content-Type': 'application/json',
    'x-fulfilld-m2m-api-key': m2mApiKey,
    'x-api-key': apiKey,
    'x-fulfilld-m2m': 'apollo',
    'x-warehouse-id': warehouseId
};

const query = `query ViewTasks($filter: ViewTaskFilter) {
    viewTasks(filter: $filter) {
        totalCount
      nodes {
        taskId
      }
    }
  }
`;

class OpenedTasks {

    async getOpenedTask() {
        try {
            const response = await axios.post(
                graphqlEndpoint,
                {
                    query: query,
                    variables: {
                        "filter": {
                            "taskStatus": {
                                "notIn": ["cancelled", "complete", "planned"]
                            },
                            "warehouseCode": {
                                "eq": "BGK"
                            }
                        }
                    },
                },
                {
                    headers: headers,
                }
            );

            console.log('GraphQL query status:', response.status);
            // console.log('GraphQL query successful response:', response.data);

            const dataResponse = response.data;

            // Extract task IDs
            const taskIds: string[] = dataResponse.data.viewTasks.nodes.map((node: { taskId: string }) => node.taskId);

            // Log task IDs
            // console.log("Task IDs:", taskIds);

            return taskIds; // Return taskIds
        } catch (error: any) {
            console.error(error);
            console.error('GraphQL query failed:', error.response.data);
            throw error;
        }
    }



    async getOpenedTaskForLP(licensePlateCode: string) {
        try {
            const response = await axios.post(
                graphqlEndpoint,
                {
                    query: query,
                    variables: {
                        filter: {
                            taskStatus: {
                                notIn: ["cancelled", "complete"]
                            },
                            warehouseCode: {
                                eq: "BGK"
                            },
                            sourceLicensePlateCode: {
                                eq: licensePlateCode
                            },
                            sourceBinCode: {
                                eq: "PALLETIZER-01"
                            }
                        }
                    },
                },
                {
                    headers: headers,
                }
            );

            console.log('GraphQL query status:', response.status);
            console.log('GraphQL query successful response:', response.data);

            const dataResponse = response.data;

            // Extract task IDs
            const taskIds: string[] = await dataResponse.data.viewTasks.nodes.map((node: { taskId: string }) => node.taskId);

            // Log task IDs
            console.log("Task IDs:", taskIds);

            return taskIds; // Return taskIds
        } catch (error: any) {
            console.error(error);
            console.error('GraphQL query failed:', error.response.data);
            throw error;
        }
    }
}

export { OpenedTasks };