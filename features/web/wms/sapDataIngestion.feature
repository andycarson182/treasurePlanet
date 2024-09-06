
Feature: SAP data ingestion for multiple user

  As a logged-in fulfilld user
  I want to make an ingestion taking data from SAP real storage units


@severity:trivial 
  Scenario: The user login into the Fulfilld Web App.
    Given I want to ingest "3" LPs for the storage bin:"PALLETIZER"
