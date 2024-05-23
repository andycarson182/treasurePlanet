
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

const query = `query Areas( $paging: OffsetPaging, $filter: AreaFilter) {
    areas(paging: $paging, filter: $filter) {
      totalCount
      nodes {
        name
        id
      }
    }
  }
`;

class Areas {

    async getAutomationAreas() {
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
                                  "like": "Automation Area"
                                }
                              },
                              {
                                "name": {
                                  "like": "Area 51"
                                }
                              },
                              {
                                "name": {
                                  "like": "Automation AreaArea 51"
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

            // Extract area IDs
            const areaIds: string[] = dataResponse.data.areas.nodes.map((node: { id: string }) => node.id);

            // Log area IDs
            console.log("Area IDs:", areaIds);

            return areaIds; // Return areaIds
        } catch (error: any) {
            console.error(error);
            console.error('GraphQL query failed:', error.response.data);
            throw error;
        }
    }

}



export { Areas };