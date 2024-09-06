
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Teams($filter: TeamFilter) {
  teams(filter: $filter) {
    nodes {
      id
      name
    }
  }
}
`;

class GetTeams {

  async getAutomationTeams() {
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
                    "like": "Automation Team"
                  }
                },
                {
                  "name": {
                    "like": "Automation Team Updated"
                  }
                },
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

      // Extract Team IDs
      const teamIds: string[] = dataResponse.data.teams.nodes.map((node: { id: string }) => node.id);

      // Log Team IDs
      console.log("Team IDs:", teamIds);

      return teamIds; // Return team Ids
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetTeams };