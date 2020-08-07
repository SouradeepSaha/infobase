## Inspiration
“Old men make war, young men fight and die.” - Winston Churchill. WW2 was one of the most brutal wars in human history. It left most of Europe in ruins and caused millions of civilian and military casualties. During this time, especially from 1939 to 1942, big cities in the UK, France and some other dominant powers in Europe suffered major bombings and missile attacks. Thousands of innocent people died because they couldn't predict what places are likely to be targeted and they had no clue what the hotspots were. In addiction to this, society was very separated and disconnected during this period. People couldn't contact their loved ones or let them know they were safe and what location they were at. This situation inspired my team to create a utility that would have solved these problems, had it been available then.

## What it does
InfoBase allows users to log missile attacks when they happen on a live map, entering the location and estimated time of the strike. InfoBase also uses statistics and averages within given radii and time ranges to predict when and where the next strike could be. It presents missile hotspots to the user on the live map so it helps them know what locations are heavily hit. This helps the issue of uncertainty in a war fueled environment and could help users avoid strikes. Further more, the web app has in built chat functions and a dashboard for the user to view their local time, current location, and status of their relatives.

## How InfoBase helps soldiers and civilians during war
The InfoBase live map helps both and civilians and soldiers to see missile hotspots and see estimated times and locations of bomb attacks. This would help them to avoid hot spots and keep safe. In addition to this we have included chat functions for users to use for communicating, a dashboard to display important information (including a live map) and a missile log function that allows users input and report strikes.

## Challenges Faced
We faced challenges with making live functional maps with the google maps API. We encountered several bugs in our Mongo Database when we tried to store user and missile data. We had issues with the styling for the site to make it both presentable and easy to use. There were a lot of issues with user authentication and also creating routes for each of the web pages. It was very challenging to build an API for our web app and fetch data from it effectively.

## Accomplishments that we are proud of
We proud that we were able to work as a team to style an easy to use UI and build a functional backend in such a short period of time. We are proud that we were able to build an API using nodeJs since this was our first time using this runtime and method. We are proud that we could find solutions to problems that people faced decades ago and build features that would have effectively aided these people.

## What we learned
We learned how to use MongoDB and nodeJs to create server side technology. We also learned how to store and process data that is input on a live map. We learned how to use sucket.io to make live chat functions and how to use API call functions in our HTML scripts In the process of making this web app, we had to research and learn more about WW2 and what both civilian and military personal went through, this helped us understand things from their point of view and made us better equipped to make this product.

## How to view/access our product
* [Heroku][heroku]
* [Github Repo][github]

To run the project locally, clone the repository from GitHub, extract it and `cd` to the appropriate directory. Then, use the commands `npm install` to install the dependencies and `npm start` to start the project.

**Submitted to ByteHacks2020 on [DevPost][devpost]**

[heroku]: https://waterloo-infobase.herokuapp.com/
[github]: https://github.com/SouradeepSaha/infobase
[devpost]:https://devpost.com/software/infobase