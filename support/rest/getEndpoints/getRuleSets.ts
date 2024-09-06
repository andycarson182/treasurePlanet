
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Nodes($filter: SlottingRulesetFilter) {
  slottingRulesets(filter: $filter) {
    nodes {
      id
      name
    }
  }
}
`;

class GetRuleSets {

  async getAutomationRuleSets() {
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
                    "like": "Automation Rule Set"
                  }
                },
                {
                  "name": {
                    "like": "Automation Rule Set For Edit"
                  }
                },
                {
                  "name": {
                    "like": "Copy of Automation Rule Set For Edit"
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

      // Extract rule set IDs
      const reulSetIds: string[] = dataResponse.data.slottingRulesets.nodes.map((node: { id: string }) => node.id);

      // Log rule set IDs
      console.log("rule set IDs:", reulSetIds);

      return reulSetIds; // Return reulSetIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetRuleSets };