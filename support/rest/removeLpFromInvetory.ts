
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../utilities/tysonFDQAAuth'

const headers = {
    'Content-Type': 'application/json',
    'x-fulfilld-m2m-api-key': m2mApiKey,
    'x-api-key': apiKey,
    'x-fulfilld-m2m': 'apollo',
    'x-warehouse-id': warehouseId
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
                        "licensePlatesToRemove": [
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