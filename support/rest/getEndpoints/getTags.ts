
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Nodes($filter: TagFilter) {
  tags(filter: $filter) {
    nodes {
      id
      name
    }
  }
}
`;

class GetTags {

  async getAutomationTags() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "filter": {
              "or": [
                {
                  "name": {
                    "like": "automation tag name"
                  }
                },
                {
                  "name": {
                    "like": "automation tag for edit"
                  }
                },
                {
                  "name": {
                    "like": "automation tag name updated"
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

      // Extract tag IDs
      const tagIds: string[] = dataResponse.data.tags.nodes.map((node: { id: string }) => node.id);

      // Log tag IDs
      console.log("tag IDs:", tagIds);

      return tagIds; // Return tagIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetTags };