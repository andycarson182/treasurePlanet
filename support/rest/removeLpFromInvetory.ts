
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

const query = `mutation Mutation ($licensePlatesToRemove:[StockRemoveDto!]!){
    removeStockFromInventory(licensePlatesToRemove:$licensePlatesToRemove){
      destinationBinId
      sourceBinId
    }
}`;

class RemoveLpFromInventory {

    async removeLpsStockFromInventory(lpId: any) {
        try {
            const response = await axios.post(
                graphqlEndpoint,
                {
                    query: query,
                    variables: {
                        "licensePlatesToRemove":  [
                            {
                              "licensePlateId": lpId
                            }
                          ]
                      }
                },
                {
                    headers: headers,
                }
            );

            console.log('GraphQL query status:', response.status);
            console.log('GraphQL query response:', response.data.data.removeStockFromInventory);

        } catch (error: any) {
            console.error(error);
            console.error('GraphQL query failed:', error.response.data);
            throw error;
        }
    }

}



export { RemoveLpFromInventory };