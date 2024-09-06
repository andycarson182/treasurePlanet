
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../utilities/tysonFDQAAuth'

const headers = {
    'Content-Type': 'application/json',
    'x-fulfilld-m2m-api-key': m2mApiKey,
    'x-api-key': apiKey,
    'x-fulfilld-m2m': 'apollo',
    'x-warehouse-id': warehouseId
};

const query = `mutation CreateStockFromProduction($input: CreateStockFromProductionTaskInputDto!) {
createStockFromProduction(input: $input)
}
`;

class Ingestion {

    async licensePlateCreation(randomLicensePlateNumber: string) {

        axios.post(
            graphqlEndpoint,
            {
                query: query,
                variables: {
                    input: {
                        createStockFromProduction: {
                            binCode: 'PALLETIZER-01',
                            stock: [
                                {
                                    productCode: "FG29",
                                    quantity: '1',
                                    stockStatusCode: '01',
                                    lotCode: '0000000083',
                                    unitOfMeasureCode: 'BT',
                                },
                            ],
                            licensePlate: {
                                code: randomLicensePlateNumber,
                            },
                            warehouseCode: 'BGK',
                            referenceDocument: 'Process_Order_zyx',
                        },
                    },
                },
            },
            {
                headers: headers,
            }
        )
            .then(response => {
                console.log(response.status);
                //console.log('GraphQL mutation successful:', response.data);
            })
            .catch(error => {
                console.log(error);
                console.error('GraphQL mutation failed:', error.response.data);
            });
    }

}

export { Ingestion };