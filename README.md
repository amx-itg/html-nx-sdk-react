# AMX-NX-HTML5-SDK REACT

## Introduction:
AMX has released three different versions of the HTML SDK designed to work with AMX Netlinx Controllers Over a websocket.  This is the REACT edition. 

### PLEASE NOTE:
Configuration of a Netlinx processor is required.  This project can reside on the Netlinx processor itself (Follow directions to prepare and load the project per the instructions with the websocket module.  It can also be hosted on any web host capable of reaching the Netlinx processor.  The processor should be configured prior to beginning working with SDK and the Websocket serivce.
 

## Installation

- Install latest version of node 20.x
- Ensure that you have `yarn`. For installation follow https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
- Run `yarn install`

 
## HTML Build:

- Run `yarn start`
- Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## HTML Configuration:

When hosted on the Netlinx controller - the  file ** /public/configuration/controller.json ** should be deleted.
When hosted off of the Netlinx controller, the controller.json file should be updated with the Username/Password and Security key of the Netlinx Controller.

