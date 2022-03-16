Feature: Petclinic application vets features
    User should able to add a new veterinarian with type Radiology.
    User should able to delete a veterinarian.

    @functional
    Scenario: Delete a veterinarian
        Given User prepared to delete a veterinarian
        When User deletes a veterinarian
        Then Deleted veterinarian does not show up on the veterinarian page

    @functional
    Scenario: Confirm number of radiology vets
        Given User prepared to add a Radiology veterinarian
        When User adds a new veterinarian with type Radiology
        Then The newly added veterinarian should show up on the veterinarian page
