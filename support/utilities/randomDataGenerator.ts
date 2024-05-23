function generateRandomCode(prefix: string): string {
    return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
}

export const randomAreaCode =generateRandomCode("automationAreaCode");
export const randomBinCode = generateRandomCode("automationBinCode");
export const randomBinSizeCode = generateRandomCode("automationBinSizeCode");
export const randomCompanyCode = generateRandomCode("automationCompanyCode");
export const randomDoorCode = generateRandomCode("automationDoorCode");
export const randomEquipmentCode = generateRandomCode("automationEquipmentCode");
export const randomEquipmentModelCode = generateRandomCode("automationEquipmentModelCode");
export const randomEquipmentTypeCode = generateRandomCode("automationEquipmentTypeCode");
export const manualReceivingRandomLicensePlateNumber = generateRandomCode("AUTOMATIONLICENSEPLATE");
export const randomLicensePlateNumber = generateRandomCode("AUTOMATIONLICENSEPLATE");
export const randomTeamName = generateRandomCode("automationTeamName");
export const randomWarehouseCode = generateRandomCode("automationWarehouseCode");
export const randomZoneCode = generateRandomCode("automationZoneCode");