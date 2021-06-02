Feature: End to End angular Schedular validation

    Application Regression

    Scenario: Login Validation for non registered user
    Given I opened Login page 
    When I give user credentials
    And Click on Login Button
    Then Throws the error message

    Scenario: New user registration
    Given I opened Login page
    And Click on SignUp Link
    When I give user registration details
    And Click on Create Account Button
    Then Displays success message

    Scenario: Admin checking for pending new user approval
    Given I opened Login page
    When I log in as Admin user
    Then I go through the list and check if previously created user is there

    Scenario: Checking the existing appointments of Admin
    Given I opened Login page
    When I log in as Admin user
    And Extract current user name from dashboard
    Then Check if there is any existing appointments

    Scenario: Creating room and appointment
    Given I opened Login page
    And I log in as Admin user
    When I create a new room
    And Check if new room is added to the lists
    Then I create an appointment
    And Check if new appointment is added into the lists
    Then I log out the account

    Scenario: Creating room by existing user
    Given I opened Login page
    And I log in with registered user
    When I create an appointment
    Then Check if new appointment is added into the lists
    And I log out the account

