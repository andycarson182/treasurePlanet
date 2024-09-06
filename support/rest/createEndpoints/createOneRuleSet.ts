
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneSlottingRuleset($input: SlottingRulesetCreateOneInput!) {
  createOneSlottingRuleset(input: $input) {
    id
    name
  }
}
`;

class CreateOneRuleSet {

  async createAutomationRuleSet() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "slottingRuleset": {
                "name": "Automation Rule Set For Edit",
                "privateRuleset": false,
                "maxMovements": 10,
                "warehouseId": "d2018fde-d507-4b6d-bb20-2efdfa779c45",
                "abcAnalysis": {
                  "criteria": "salesOrderLineItems",
                  "indicatorPercentages": [
                    50,
                    25,
                    25
                  ]
                },
                "forecasting": "historical",
                "weights": {
                  "pickDensity": 20,
                  "pickEfficiency": 20,
                  "putawayEfficiency": 20,
                  "putawayDensity": 20,
                  "avoidCongestion": 20,
                  "favorGroundLevel": 20
                },
                "restrictions": {
                  "fefoFifoPicking": false,
                  "fifoPicking": true,
                  "heaviestToLightestPicks": false,
                  "preventMixedProductsInBins": false,
                  "preventMixedLotsInBins": true,
                  "preventMixedExpirationDatesInBins": false,
                  "enforceSingleOrderPicks": true,
                  "preventSimilarProductsInAdjacentBins": false,
                  "restrictDistance": false,
                  "restrictedDistance": 1,
                  "restrictDistanceBy": "aisle"
                },
                "workers": [
                  {
                    "id": "ca20f852-2f7d-4f12-8b93-ee1d7805ccb4",
                    "quantity": 1
                  },
                  {
                    "id": "07e06a86-999a-4c5c-9228-4bdc5f9d2852",
                    "quantity": 1
                  },
                  {
                    "id": "5df54580-23d6-42d5-b143-3c455cba525d",
                    "quantity": 1
                  }
                ],
                "equipment": [
                  {
                    "id": "af8b21ad-4da9-4645-b7a5-fbdb33e1ab5e",
                    "quantity": 1
                  },
                  {
                    "id": "c330d0ef-79ee-4fdc-9161-f3fd2f881178",
                    "quantity": 1
                  },
                  {
                    "id": "ccb573e9-6af0-49be-9e73-1e4f007d7c2e",
                    "quantity": 1
                  },
                  {
                    "id": "b5fadcd2-e73b-43dc-b9c3-253ee794eb1b",
                    "quantity": 1
                  },
                  {
                    "id": "6f8a9740-c2ae-40d9-8798-ee639b6abce8",
                    "quantity": 1
                  },
                  {
                    "id": "94fd4204-a7de-4514-bbd2-b68f128d36e7",
                    "quantity": 1
                  },
                  {
                    "id": "2c63d6ec-cf90-49b5-87b8-7aa2c003c42b",
                    "quantity": 1
                  },
                  {
                    "id": "b60bc5e1-8134-4847-93bc-1352ff6a4fe0",
                    "quantity": 1
                  }
                ],
                "zoneGroups": [],
                "zones": [
                  {
                    "zoneId": "009b8abd-67a2-4254-97a0-4346df6fe9b5",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "1070c6bc-344e-43fb-b48f-406bac12d4b9",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "146a5f89-de73-484c-a287-58bc73b1dcbf",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "1b72788d-0925-479a-a3e6-6f57e7cf9239",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "2116f5d7-7b95-486f-9c3b-43ed01f038eb",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "21ad8ac3-5011-4486-bc03-f89a0353b45f",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "262ee331-b7fd-440b-ac3a-a89ce94ce25d",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "2ab90536-4377-475d-b7bc-ea01ec1d1d86",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "347141f4-4307-4544-ac46-e0f3818ca91d",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "3603fa8b-3972-4169-a33c-ec960cee5ce9",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "362633ef-390e-4bb3-9854-74adc918d6b1",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "38891592-8796-42a7-9c76-0cf85aaee1e5",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "4294be2c-3304-4b1a-aace-1e5e913429c5",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "471ef4a5-fc0a-4d95-9fae-8d09fa285e9d",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "4caaa6a4-396f-43f2-8d2a-614a78d8e436",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "4cafecf2-0717-41a1-b688-830843ea9776",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "5704db2b-ddcb-4c85-8af6-716f463e566f",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "59380024-769b-4599-b37c-211f2d852dd6",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "59e67b03-c1e7-47de-b719-cdfde1a7d3c4",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "6b7cb91f-e758-4bde-b0cd-4a409529f58b",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "6c86d42f-6ecf-496d-bb7e-1d81648fa6c0",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "747f1e1f-6aa2-41e2-91dd-655c9697a957",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "7582bd0d-16cb-47d1-a0cc-ad36a1526f01",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "764e4730-064a-473e-98cd-557eb185994f",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "782d8eb9-b9b7-43b3-aa15-30cc7fe7cd35",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "7dff78f8-e452-4c8a-b1d0-9acb02cbd68a",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "805a307a-13c4-4cb8-9a25-33da519078ab",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "80c6b325-489f-404c-a6e9-8c40ef721bdc",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "87f60dd3-6f1f-403d-bad1-318fc29dbe37",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "8dfbfbbd-5beb-4245-b28c-5609e99da17f",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "8f48577a-245c-4619-86e5-b6cbadaf12e2",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "8fc4fe63-e6bb-4171-a889-c1c56a49f836",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "93d56ce1-b995-449e-9cbb-5ecab79aad5b",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "94cb8ecd-5c78-4e87-b27e-e2bebfd4dfa3",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "98379d47-51b7-4d4d-914b-2c07e1212048",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "a5a45799-48b2-4dd3-b1e8-d777817a9adf",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "ad09a44d-1c0f-44e8-95d1-2103abef6829",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "adb6a211-cdad-45c1-a6eb-235aa30a3ca6",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "adbb8819-5791-4a7c-94c9-3cf58581038d",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "b0255d0e-6b4a-473b-9f53-eb16f1af09be",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "b461ace7-1a99-4fe3-a85a-3ed04ebe26f8",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "bc3bc50f-58f9-4468-a1b8-2a28b57ba455",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "bd3dc260-6f7e-4408-98be-6c8e2e85d99d",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "c20d40fd-0546-4acd-86c2-9ad999ca8026",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "c5936727-a342-444c-9507-428059fe512f",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "cac5290f-ef03-46ee-b745-e84c5e4a161f",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "cf58fca9-1cd6-419b-ac89-8dfd67d43fb3",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "d22b20c1-7bbb-4e04-9d99-ae230eb64063",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "d3b4a4a1-6fe1-4a54-9b4f-b3f0c7348d03",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "e62e54c3-2e81-428e-aa57-61683dd5eed3",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "e74fc72a-9174-42b3-b4c9-bb74646b029e",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "e8d2fc1a-e350-4ffc-b2c4-278b44f0c528",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "e92052b5-c5b2-42d2-a452-fdeff2ac4d19",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "eab980e6-876e-47be-a0cb-bbc3935dfc94",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "eae519d3-1efb-4f9b-bf7f-f213ab38e283",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "ed14b9f9-b99f-4cac-92eb-1a88ea81204a",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "f491d685-4c13-44eb-9705-d8fd18e1f81a",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "f513299a-5613-4ff6-81d6-442858893f2b",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "f92bee71-80bd-426c-896e-90860379fb7e",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  },
                  {
                    "zoneId": "f9d5e9ba-4daf-4fd8-ba39-d3409298c8e6",
                    "optimizeZone": true,
                    "zoneConfiguration": "warehouse",
                    "weights": {
                      "pickDensity": 20,
                      "pickEfficiency": 20,
                      "putawayEfficiency": 20,
                      "putawayDensity": 20,
                      "avoidCongestion": 20,
                      "favorGroundLevel": 20
                    },
                    "restrictions": {
                      "fefoFifoPicking": false,
                      "fifoPicking": true,
                      "heaviestToLightestPicks": false,
                      "preventMixedProductsInBins": false,
                      "preventMixedLotsInBins": true,
                      "preventMixedExpirationDatesInBins": false,
                      "enforceSingleOrderPicks": true,
                      "preventSimilarProductsInAdjacentBins": false,
                      "restrictDistance": false,
                      "restrictedDistance": 1,
                      "restrictDistanceBy": "aisle"
                    },
                    "maxFixedBinsPerProduct": 1,
                    "productTags": [],
                    "binTags": []
                  }
                ],
                "createdByUserId": ""
              }
            }
          }
        },
        {
          headers: headers,
        }
      );

      console.log('GraphQL mutation status:', response.status);
      console.log('GraphQL mutation successful response:', response.data);

    } catch (error: any) {
      console.error(error);
      console.error('GraphQL mutation failed:', error.response.data);
      throw error;
    }
  }

}

export { CreateOneRuleSet };