
import axios from 'axios';

const m2mApiKey = 'AIzaSyBY5OHbDWktJTPyUxdHcjPnswd4l4Ialj8';
const apiKey = 'AIzaSyBY3xxlFqUZdnC5V1eODcQBvCJCAfzjqcY';
const graphqlEndpoint = 'https://api.fd.fulfilld.qa/graphql';


const headers = {
    'Content-Type': 'application/json',
    'x-fulfilld-m2m-api-key': m2mApiKey,
    'x-api-key': apiKey,
    'x-fulfilld-m2m': 'apollo',
    'x-warehouse-id': '6c56e47a-f7fb-4bbf-9d48-cdd249f857e1'
};

const query = `mutation CancelManyTasks($input: [TaskCancelManyDto!]!) {
    cancelManyTasks(input: $input) {
      id
    }
  }
`;

class CancelTasks {

    async updatingTaskStatusToCancel(taskIds:any) {
        try {
            const response = await axios.post(
                graphqlEndpoint,
                {
                    query: query,
                    variables: {
                        "input": taskIds
                    },
                },
                {
                    headers: headers,
                }
            );
    
            console.log('GraphQL mutation status:', response.status);
            console.log('GraphQL mutation response:', response.data);
    
        } catch (error:any) {
            console.error(error);
            console.error('GraphQL mutation failed:', error.response.data);
            throw error;
        }
    }

}



export { CancelTasks };