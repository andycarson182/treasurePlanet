
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Nodes($filter: UserFilter) {
  users(filter: $filter) {
    nodes {
      id
      firstName
      email
    }
  }
}
`;

class GetUsers {

  async getAutomationUsers() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "filter": {
              "or": [
                {
                  "email": {
                    "like": "heisengberg@test.com"
                  }
                },
                {
                  "email": {
                    "like": "danielLarousso@test.com"
                  }
                }
              ]
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

      // Extract User IDs
      const userIds: string[] = dataResponse.data.users.nodes.map((node: { id: string }) => node.id);

      // Log User IDs
      console.log("User IDs:", userIds);

      return userIds; // Return userIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetUsers };