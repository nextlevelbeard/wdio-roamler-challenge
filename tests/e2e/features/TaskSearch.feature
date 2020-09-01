Feature: Task Search

  Background:
	Given I am on the app

  Scenario: Can complete a task from the task list
	Given I am logged in
		|	Email						|	Password	|
		|	swcnahfrpybmiypoho@miucce.online		|	pqLAowKS	|
	And I search for a task called "Test Exercise"
	And I accept the task
	When I complete the questionnaire
		|	Type		|	Answer		|
		|	Navigate	|	Next		|
		|	Camera		|	Take		|
		|	Picture		|	Select		|
		|	Text		|	Cool exercise	|
	And I open my Profile
	And I press Activity Log
	Then I should see the task marked as completed
