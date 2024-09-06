
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

class DynamicIngestion {

    async licensePlateCreation(storageBin: string, material: string, totalQuantity: string, warehouse: string, storageUnit: string, baseUoM: string, batch: string) {//randomLicensePlateNumber: string

        axios.post(
            graphqlEndpoint,
            {
                query: query,
                variables: {
                    input: {
                        createStockFromProduction: {
                            binCode: storageBin,
                            stock: [
                                {
                                    productCode: material,
                                    quantity: totalQuantity,
                                    lotCode: batch,
                                    unitOfMeasureCode: baseUoM,
                                },
                            ],
                            licensePlate: {
                                code: storageUnit,
                            },
                            warehouseCode: warehouse,
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
                console.log('GraphQL mutation successful:', response.data);
            })
            .catch(error => {
                console.log(error);
                console.error('GraphQL mutation failed:', error.response.data);
            });
    }

}

export { DynamicIngestion };