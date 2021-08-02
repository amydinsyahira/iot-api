# IoT (Internet of things) API Service

## Installation

1. Rename file `.env.example` to be `.env`.

2. Update the `.env` file data according to your local server. 

3. Run `npm install` to install all the project dependencies.

4. Run `npm start` to spin up a local server.

5. Visit `http://localhost:[PORT]/`

*Note: the local port is dynamic, so check the .env file for which port is being listened to.*

## Database Structure

There are 2 main resources:

1. [User/Account Information](Coming soon)
2. [Water Meter Information](https://github.com/amydinsyahira/iot-api#water-meter-information)


## Dependencies
- cookie-parser
- cors
- debug
- dotenv
- ejs
- express
- moment
- morgan
- mysql


# Endpoints

## Water Meter Information

### Create a new water meter:
- POST `/watermeter`

Example request:
```
{
  "title": "Region Bantul",
  "watermeter": {
      "device": 1005,
      "value": 268000
  }
}
```

Example successful `200` response:
```
New water meter data inserted
```
Possible `40X` responses:
- The object parameters `watermeter` with `device` and `value` has to be filled

### Get the list of water meter records:
- GET `/watermeter`

Example successful `200` response:
```
[
  {
    "ID": 1,
    "date_created": "2021-08-02T16:40:22.000Z",
    "date_updated": "2021-08-02T16:40:22.000Z",
    "title": "Region Bantul",
    "type": "",
    "status": "publish",
    "author": "unknown",
    "watermeter": [
      {
        "device": "1002"
      },
      {
        "value": "254000"
      }
    ]
  },
  ...
]
```
Possible `40X` responses:
- There ideally shouldn't be any scenarios that result in a response error. If so, please let me know.