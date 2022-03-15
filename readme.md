# User Groups

## Server

This project uses a dummy API implemented in `src/pages/api` which creates a simple
interface for managing user groups. It is deliberately simple, and the documentation
can be found at `/swagger`. If you want to make changes to the API, feel free. You
can find instructions for syncing the client API below.

## Client

The client is built using `next`, and utilises css-in-js along with `twin.macro`
for styling. The client api for the server is generated using a tool called
[`orval`](https://orval.dev/), which can be invoked to synchronize the client code
with the server openapi definitions after making changes.

```shell
yarn install
yarn api:sync
```

The resulting service definitions (fully typed) are generated into `src/service`,
and available as hooks, using `react-query` for persistence and caching.

Other commands are available in `package.json`

```shell
yarn dev # development server
yarn build # production build
```

## Running the App

To stand the project up, after running yarn install - run `yarn dev`

## Adding Users to a Group

To add a user to a group, drag a user from the Users List & drop it on the group you would like to add the user to

## Adding a Group to a User

To add a group to a user, drag the group card and drop it on top of the user

## Removing Users

To remove a user, click the remove button inside the group

## Adding a new user

To add a new user, click the + icon at the bottom of the users list & enter a new user. Once the user has been added, you can add groups to the user using the same functionality as the other cards

## Producing errors

To test basic error handling that has been setup on removing a user from a group, you can change the id in addUserToGroupHook({id: groupId, user: item.id}) to a string that is not a valid group (since groupId's are uuid's, any string will do).

You'll also need to navigate to the groups API for adding/removing a user (api/groups/user) and switch the return from the else if the group id is not valid to a 404 instead of a 202.

## Shortcomings

In the sake of time, while I added some error handling to the project, I didn't impliment robust error handling throughout the app. If I were buliding this for a production build, I'd take the time to ensure all edge cases were handled & more robust error handling was completed. One of the first places I'd add if I came back to the project would be on the input of a user, adding rules around min characters & providing error messages if they enter a empty string for example.

The first interaction with the app, from either adding users, removing them, or adding a brand new user to a group immediately returns an error (currently showing as a 202 instead of a 404 - for UX of testing the app.) This in a production version should be a 404 & this interaction would be sorted out. The error is occuring is because it can't find the group passed in by the request. It is initializing the groups with one set of id's then it's rerunning that file and reassigning the groups (giving them new uuids). With more time I'd investigate this further, to eliminate that behavior.

For the sake of time, I added the new user as a card at the bottom of the users list but I'd like to see this in a modal instead or appear more promenately on the screen, with additioanl fields to build out a more rebust user including first & last name. I'd also make the user id a uuid instead of lowercase first name. Since using the lowercase name, won't allow you to add two users with the same name. I left this functionality because it was already implimented on id: 'john' for example but this should be a uuid to match groups & unsure all users are unique.

I'm not statisfied with the drag functionality for users at the buttom of the list. If you add a new user and try to drag it up to admin, it will scroll up but it's tedius & takes awhile. In a production product I'd make sure this scrolled up much more smoothly.

I also wrote the app mostly in Javascript since I'm more familiar with it than Typescript currently. However, since the rest of the app is in Typescript, with more time I would update to type out the rest of the code.

Lastly, I'd also improve styling in the app. I didn't have time to dive in and fully explore tailwind but I'd like to see if there is the ability to set reusable classes/styles so I'm not replicating the same styles multiple times.
