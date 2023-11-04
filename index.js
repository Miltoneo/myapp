require("dotenv").config();

const mysql = require('mysql2/promise');
const express = require('express');
const db = require ('./db.js');
const port = process.env.PORT;
const app = express();
app.use(express.json());

//>>> new
const chartjs = require('chart.js/auto');
const moment  = require('moment');
//<<< new
//inicia o servidor

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "./src" + q.pathname;
  console.log ("filename:", filename)

  fs.readFile(filename, function(err, data)  {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });


    if (filename == './src/chart_myline.html') {
      myFunc2(data, function (data) {
        res.write(data);
        res.end(); // 
      });
    } else

    if (filename == './src/chart_mybar.html') {
      myfunc3(data, function (data) {
        res.write(data);
        res.end(); //
      });
    } else
    
    if (filename == './src/devices.html') {
      myfunc4(data, function (data) {
        res.write(data);
        res.end(); //
      });
    } else

    if (filename == './src/index.html') {
      myfunc4(data, function (data) {
        res.write(data);
        res.end(); //
      });
    } 
  })
}).listen(port); 

//-- log status
console.log('Server is running at port:', port);


//-- select *
async function myFunc2(a_data, callback) {
  console.log('index.js -> myFunc2() ... entrei');   

  let mytable = await db.queryRow('flow1');

  var result = a_data.toString('utf8').replace('{{chartData}}', JSON.stringify(mytable.field1));  
  result = result.toString('utf8').replace('{{chartLabel}}', JSON.stringify(mytable.timestamp));  

  console.log('index.js -> getValue()-> resultado'); 
  console.log('index.js -> getValue()-> mytable.field1: ',mytable.field1);
  console.log('index.js -> getValue()-> mytable.timestamp:',mytable.timestamp);
  console.log('toPrint:',result); 

  console.log('index.js -> myFunc2() ... saiu');  
  callback (result);
}

//-- 
async function myfunc3(a_data, callback) {
  console.log('index.js -> myfunc3() ... entrei');   

  const mytable = await db.sql_sum_monthly('flow1');

  var result = a_data.toString('utf8').replace('{{chartData}}', JSON.stringify(mytable.data));
  result = result.toString('utf8').replace('{{chartLabel}}', JSON.stringify(mytable.label)); 
  console.log('toPrint:',result); 

  console.log('index.js -> myfunc3() ... saiu');  
  callback (result);
}

//-- 
async function myfunc4(a_data, callback) {
  console.log('index.js -> myfunc4() ... entrei');   

  let mytable = await db.queryRow('flow1');
  let result = a_data.toString('utf8').replace('{{chartData1}}', JSON.stringify(mytable.data));
  result = result.toString('utf8').replace('{{chartLabel1}}', JSON.stringify(mytable.label)); 

  mytable = await db.sql_sum_7day('flow1');
  result = result.toString('utf8').replace('{{chartData2}}', JSON.stringify(mytable.data));
  result = result.toString('utf8').replace('{{chartLabel2}}', JSON.stringify(mytable.label)); 

  mytable = await db.sql_sum_daily_current_month('flow1');
  result = result.toString('utf8').replace('{{chartData3}}', JSON.stringify(mytable.data));
  result = result.toString('utf8').replace('{{chartLabel3}}', JSON.stringify(mytable.label)); 

  mytable = await db.sql_sum_monthly('flow1');
  result = result.toString('utf8').replace('{{chartData4}}', JSON.stringify(mytable.data));
  result = result.toString('utf8').replace('{{chartLabel4}}', JSON.stringify(mytable.label)); 

  console.log('toPrint:',result); 
  console.log('index.js -> sql_sum_day() ... saiu');  
  callback (result);
}


//-- 
async function sql_sum_7day(a_data, callback) {
  console.log('index.js -> sql_sum_7day() ... entrei');   

  const mytable = await db.sql_sum_7day('flow1');

  var result = a_data.toString('utf8').replace('{{chartData}}', JSON.stringify(mytable.data));
  console.log('toPrint:',result); 

  console.log('index.js -> sql_sum_7day() ... saiu');  
  callback (result);
}

