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

## Group Functionality

Each group will display a list of users associcated with the group. You can also choose to remove a user from a group. This will remove the tag from the user for that group, however I am still working out the kinks on the rerender for users. It currently requires you to click off target (such as in dev tools) & come back for the rerender. The update to all groups state isn't triggering the a rerender of that component. I'd like to reimpliment this by building on the API directly & adding groups to the user object directly instead of looping through the groups object.

## User Functionality

Each user will be displayed with their assigned groups. You can drag a user from users over to the GroupList to assign them to the Admin group. This is currently hard coded as I work to determine to access the drop target to pull the ID, so I can dynamically populate the groupId that makes the call to add the user.

A new user can also be added at the bottom of the users section.
