 From https://docs.tuya.com/en/iot/open-api/api-list/api/proprietary-category/universal-infrared?id=K9jgsgd7buln4#title-15-Switch%20TV%20channels

 The combined air conditioner delivery command is mainly related to four states: power mode temp fan
 1, open the air conditioning command to pass parameters: power = 1, other values are null;
 2, turn off the air conditioning command pass parameters: power = 0, other values are null;
 3, control air conditioning mode pass parameters: power = 1, mode = [0 - 4], other values are null;
 4, control the specific temperature of the air conditioning parameters: power = 1, temp = specific temperature value, other values are null;
 5, increase the air conditioning temperature parameters: power = 1, temp = 1, other values are null;
 6, reduce the air conditioning temperature parameters: power = 1, temp = -1, other values are null;
 7, control air conditioning wind speed parameters: power = 1, fan = [0 - 3], other values are null;
 8, increase the air conditioning wind speed transmission parameters: power = 1, fan = 100, other values are null;
 9, reduce the air conditioning wind speed transmission parameters: power = 1, fan = -100, other values are null;
 Modes 0-4 represent: cooling, heating, automatic, air supply, dehumidification
 Wind speed 0-3: automatic, low speed, medium speed, high speed
 Temp = specific temperature value, - > temperature range 16 - 31

 example
 {
  "remote_id": "xxx",
  "remote_index": "11842",
  "power": "0",
  "mode": "0",
  "temp": "22",
  "wind": "3"
 }