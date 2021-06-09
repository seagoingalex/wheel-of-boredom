Phase 1 Project - Wheel of Boredom
Collaborators: Brianna & Alex

!! Remember to run JSON server to ensure the db.json file is accessed and functionality is working as intended !!
// json-server --watch db.json

Feature Highlights
- Functional spinning wheel comprised of tricky HTML/CSS and elicited by an onclick function in the HTML.
- Wheel wedges are populated by 8 random activities fetched from the Bored API: https://www.boredapi.com/
-  A wedgeReturn() function consists of a switch statement that, depending on the wedge selected (based on the DEGREE of rotation), will fetch the larger dataset of that wedge from the API and populate the title card on the left with the activity title, type, and number of participants.
- A user can select the “Add activity” button to populate an unordered list at the bottom of the page. This list will persist, as the button actually posts the activity to the db.json file and THEN adds it to page.
- A user can select the red [X] button next to a specific activity under “My List” to remove the line item. This change will persist, as the button is actually removing the activity (based on the passed-in Id from its rendering) from the db.json file using a fetch() DELETE method.

Additional Feature Tidbits
- A random number generator is used to determine the degrees the wheel should spin, then chains that to a div.style.transform of the entire wheel div.
- A setTimeout() is used to ensure the card data isn’t fetched until the wheel has nearly stopped spinning.
- An if statement looks for whether the “Add Activity” button is already on the card to ensure one does not get added every spin.
- When an activity is rendered in the “My List” unordered list, in-line HTML is used to alternate the coloring and bolding of each item that’s fetched from the db.json file.
- In case the unordered list gets too long, a scroll is applied to the div, and will only appear IF the div's content is overflowing beyond its max height.

Future Feature Ideas
- Greater CSS flexibility
- Allow a user to filter the activities populated on the wheel by filtering the activity type associated with each object in the API.

What is the basic story of our application?
- Develop a spinning wheel that suggests an activity at random for the user to do.
>> The wheel will get suggestions through an API that fetches activity recommendations for people who are bored.
>> The page visual will change to provide additional details about the activity that is selected.
>> STRETCH GOAL: An activity that is picked on the wheel will be saved at the bottom of the web page under a persisting list that records “My activities".
>> This creates a visually appealing way to help folks bored during quarantine to quickly come up with activities to fill their day.

Core features of our MVP
- Build the wheel with HTML / CSS styling, using similar projects for reference: https://workshops.hackclub.com/spinning_wheel/
- Populate the wheel’s tiles with random activities from the API: https://www.boredapi.com/
>> STRETCH GOAL: Filter the activities populated on the wheel by filtering the activity type…alongside potentially other filters!
- Return an alert with the activity and its respective details.
>> STRETCH GOAL: return a div CARD with the activity & its respective details (or some visual alternative to display details beyond JUST the activity name” from the API call.
- Comment box at the bottom of the page page .
>> STRETCH GOAL (in place of comment box): The selected activity will then be added to a separate JSON file and persist at the bottom of the webpage under a “My activities” ul/div/card/HTML element.

API specs
- Get activity data from the bored API.
>> Activity - The name of the activity.
>> Accessibility - Is this activity something that’s easy to get into?
>> Type - What kind of activity is this?
>> Participants - Is this a team or solo activity?
>> Price - How spendy is this activity?
- Render X number of activity names on the wheel when a user “spins the wheel".
>> X = the number of wheel wedges on the wheel.
>> Question: What does the wheel look like BEFORE someone spins it and the activity names populate?
- Once a activity is selected by the wheel, render an alert with more details about the activity, based on what’s available in the API.
>> STRETCH GOAL: Once a activity is selected by the wheel, render a “card” with more details about the activity, based on what’s available in the API.
- STRETCH GOAL: An activity selected by the wheel is then saved in a list at the bottom of the webpage. These activities are POST’d to a separate db.json file that retains stored activities from previous wheel spins.
>> STRETCH GOAL: A user can CHOOSE to save the activity the wheel selected (MVP is to have the wheel simply autopopulate the list).
>> STRETCH GOAL: A user can remove an activity from the list with some type of “[X]” delete button.

Challenges
- Figure out how to get the wheel onto the page.
>> Figure out how to populate the wheel with random API data?
>> How can we ensure there’s an activity on the board that we can actually target once it is “selected” by the wheel?
- How does an eventListener on a button elicit a spinning of the wheel?
>> How fast does the wheel spin? For how long? Can we get it to slow down? Is the “visual cue” of a wheel spinning too difficult?
>> If the wheel’s TOO difficult, could we alternatively parse through the database of activities and render some other visually appealing element representative of the activity?
- What does the layout look like when no action is taken, how does it change...
>> ...when the wheel is spun.
>> ...when the activity’s details are displayed.
>> ...when persistent data is stored at the bottom of the page.
>> ...when the wheel is respun.
- Can we rely on the usefulness (value) of the bored API’s activities?
