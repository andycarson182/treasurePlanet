
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

const query = `query BaseInventoryAll($filter: InventoryBaseQueryShapeFilter) {
    baseInventoryAll(filter: $filter) {
        nodes {
            licensePlateId
        }
    }
}`;

class InventoryStock {

    async getInventoryStock() {
        try {
            const response = await axios.post(
                graphqlEndpoint,
                {
                    query: query,
                    variables: {
                        "filter": {
                            "binCode": {
                                "in": [
                                    "IB-FG-STG-01-02",
                                    "IB-FG-STG-01-01",
                                    "IB-FG-STG-01-02",
                                    "IB-FG-STG-02-01",
                                    "IB-FG-STG-02-02",
                                    "IB-FG-STG-03-01",
                                    "IB-FG-STG-03-02",
                                    "IB-FG-STG-04-01",
                                    "IB-FG-STG-05-02",
                                    "MAN-IB-STATION"
                                ]
                            }
                        }
                    }
                },
                {
                    headers: headers,
                }
            );

            console.log('GraphQL query status:', response.status);
            console.log('GraphQL query response:', response.data.data.baseInventoryAll.nodes);

            const dataResponse = response.data;

            const licensePlateIds: string[] = dataResponse.data.baseInventoryAll.nodes.map((node: { licensePlateId: string }) => node.licensePlateId);            // Extract task IDs


            //Log task IDs
            console.log("LP IDs:", licensePlateIds);

            return licensePlateIds; // Return taskIds
        } catch (error: any) {
            console.error(error);
            console.error('GraphQL query failed:', error.response.data);
            throw error;
        }
    }

}



export { InventoryStock };