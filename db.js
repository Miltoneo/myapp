//https://www.luiztools.com.br/post/criando-uma-webapi-com-nodejs-e-mysql/?utm_source=google&utm_medium=cpc&utm_campaign=12231680300&utm_content=153262971818&utm_term=node%20js%20mysql&gclid=EAIaIQobChMI1ZXszdbdgQMVDjrUAR3o_QhyEAAYAiAAEgK_uvD_BwE

const mysql = require('mysql2/promise');
const moment  = require('moment');

const pool = mysql.createPool({
    connectionLimit: 100, //important
    host:       process.env.DB_HOSTNAME,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASSWORD,
    database:   process.env.DB_DATABASE,
    debug:      false    
});

//query = SELECT value1 FROM `sensordata` where `sensor` = 'flow1'
async function queryRow(tagsensor) {
    console.log('db.js->queryRow()-> ... entrei');

    let selectQuery = 'SELECT ??, reading_time FROM ?? WHERE ?? = ? order by reading_time DESC limit 99';
    let myquery = mysql.format(selectQuery, ["value1","sensordata", "sensor", tagsensor]);

    const conn = await pool.getConnection();
    const [resultSet, fields] = await conn.query(myquery);
    conn.release();

    var mydataset = {
           data: [],
           label:[]
    };

    for (var i = 0; i<resultSet.length; i++) {
        mydataset.data.push(resultSet[i].value1);
        mydataset.label.push(resultSet[i].reading_time);             
    }

    console.log('db.js->queryRow()-> mydataset:');   
    //console.log(mydataset.field1); 
    //console.log(mydataset.timestamp); 
    console.log(resultSet);     
    console.log('db.js->queryRow()-> saiu...');    

    return mydataset;   

}
 
//query = 
async function sql_sum_day(tagsensor) {
    console.log('db.js->sql_sum_day()-> ... entrei');

    let selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between "2023-10-23 00:00:00" and "2023-10-23 23:59:00"';
    let myquery = mysql.format(selectQuery, ["value1","sensordata"]);

    const conn = await pool.getConnection();
    const [resultSet, fields] = await conn.query(myquery);
    conn.release();

    let mydataset = [];

    mydataset.push(resultSet[0].mysoma);

    console.log('db.js->sql_sum_day()-> mydataset:');
    //console.log(mydataset.field1);     
    console.log(resultSet[0].mysoma);           
    console.log(mydataset[0]);
    console.log(mydataset);    
    console.log('db.js->sql_sum_day()-> saiu...');    
    return mydataset;   
}

//query = 
async function sql_sum_day2(_tagsensor) {
    console.log('db.js->sql_sum_day()-> ... entrei');
    
    let mydataset = {
        data  : [],
        label : []
    };

    //--get date now
    let day_now = moment().date();
    let ts_range_sta_0 = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
    let ts_range_fin_0 = moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");

    console.log('db.js->ql_sum_day2()-> day_now:', day_now);    

    //-- get day-0
    console.log('get day-0... ');    

    let ts_range_sta = moment(ts_range_sta_0).subtract(0,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_sta: ', ts_range_sta);

    let ts_range_fin = moment(ts_range_fin_0).subtract(0,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_fin: ', ts_range_fin); 

    let selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between ? and ?';
    myquery = mysql.format(selectQuery, ["value1", "sensordata", ts_range_sta, ts_range_fin ]);
    //--
    console.log('db.js-> myquery1: ', myquery); 
    let conn = await pool.getConnection();
    let [resultSet, fields] = await conn.query(myquery);
    mydataset.data.push(resultSet[0].mysoma);
    mydataset.label.push(moment(ts_range_sta_0).format("MM/DD"));

    //-- get day-1
    console.log('get day-1... '); 

    ts_range_sta = moment(ts_range_sta_0).subtract(1,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_sta: ', ts_range_sta);

    ts_range_fin = moment(ts_range_fin_0).subtract(1,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_fin: ', ts_range_fin); 

    selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between ? and ?';
    myquery = mysql.format(selectQuery, ["value1", "sensordata", ts_range_sta, ts_range_fin ]);
    //--
    console.log('db.js-> myquery2: ', myquery); 
    conn = await pool.getConnection();
    [resultSet, fields] = await conn.query(myquery);
    mydataset.data.push(resultSet[0].mysoma);
    mydataset.label.push(moment(ts_range_sta).format("MM/DD"));

    //-- get day-2
    console.log('get day-3... '); 

    ts_range_sta = moment(ts_range_sta_0).subtract(2,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_sta: ', ts_range_sta);

    ts_range_fin = moment(ts_range_fin_0).subtract(2,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_fin: ', ts_range_fin); 

    selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between ? and ?';
    myquery = mysql.format(selectQuery, ["value1", "sensordata", ts_range_sta, ts_range_fin ]);
    //--
    console.log('db.js-> myquery2: ', myquery); 
    conn = await pool.getConnection();
    [resultSet, fields] = await conn.query(myquery);
    mydataset.data.push(resultSet[0].mysoma);
    mydataset.label.push(moment(ts_range_sta).format("MM/DD"));

    //-- get day-3
    console.log('get day-3... '); 

    ts_range_sta = moment(ts_range_sta_0).subtract(3,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_sta: ', ts_range_sta);

    ts_range_fin = moment(ts_range_fin_0).subtract(3,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_fin: ', ts_range_fin); 

    selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between ? and ?';
    myquery = mysql.format(selectQuery, ["value1", "sensordata", ts_range_sta, ts_range_fin ]);
    //--
    console.log('db.js-> myquery2: ', myquery); 
    conn = await pool.getConnection();
    [resultSet, fields] = await conn.query(myquery);
    mydataset.data.push(resultSet[0].mysoma);
    mydataset.label.push(moment(ts_range_sta).format("MM/DD"));

    //-- get day-4
    console.log('get day-4... '); 

    ts_range_sta = moment(ts_range_sta_0).subtract(4,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_sta: ', ts_range_sta);

    ts_range_fin = moment(ts_range_fin_0).subtract(4,'day').format('YYYY-MM-DD HH:mm:ss');
    console.log('ts_range_fin: ', ts_range_fin); 

    selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between ? and ?';
    myquery = mysql.format(selectQuery, ["value1", "sensordata", ts_range_sta, ts_range_fin ]);
    //--
    console.log('db.js-> myquery2: ', myquery); 
    conn = await pool.getConnection();
    [resultSet, fields] = await conn.query(myquery);
    mydataset.data.push(resultSet[0].mysoma);
    mydataset.label.push(moment(ts_range_sta).format("MM/DD"));

    conn.release();

    console.log('db.js->sql_sum_day()-> mydataset: ', mydataset);
 
    console.log('db.js->sql_sum_day()-> saiu...');    
    return mydataset;   
}

//query = 
async function sql_sum_7day(_tagsensor) {
    console.log('db.js->sql_sum_7day()-> ... entrei');
    
    let mydataset = {
        data  : [],
        label : []
    };

    let day_max = 7;

    //--get date
    let day_now = moment().date();
    let ts_range_sta_0 = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
    let ts_range_fin_0 = moment().endOf('day').format("YYYY-MM-DD HH:mm:ss");

    console.log('db.js->sql_sum_7day()-> day_now:', day_now);    

    //-- get day-0
    console.log('get day-0... ');    

    let conn = await pool.getConnection();
    for(day_count= 0;day_count<=day_max;++day_count)
    {

        let ts_range_sta = moment(ts_range_sta_0).subtract(day_count,'day').format('YYYY-MM-DD HH:mm:ss');
        console.log('ts_range_sta: ', ts_range_sta);

        let ts_range_fin = moment(ts_range_fin_0).subtract(day_count,'day').format('YYYY-MM-DD HH:mm:ss');
        console.log('ts_range_fin: ', ts_range_fin); 

        let selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between ? and ?';
        myquery = mysql.format(selectQuery, ["value1", "sensordata", ts_range_sta, ts_range_fin ]);
        //--
        console.log('db.js->sql_sum_7day()-> myquery1: ', myquery); 
        //let conn = await pool.getConnection();
        let [resultSet, fields] = await conn.query(myquery);
        mydataset.data.push(resultSet[0].mysoma);
        mydataset.label.push(moment(ts_range_sta).format("MM/DD"));
    }
    conn.release();

    console.log('db.js->sql_sum_7day()-> mydataset: ', mydataset);
    console.log('db.js->sql_sum_7day()-> saiu...');  

    return mydataset;   
}

//query = 
async function sql_sum_monthly(_tagsensor) {
    console.log('db.js->sql_sum_monthly()-> ... entrei');
    
    let mydataset = {
        data  : [],
        label : []
    };

    let month_now = moment().month();
    console.log('month_now: ', month_now); 

    let startOf_month = moment().startOf('month').format("YYYY-MM-DD HH:mm:ss"); 
    let endOf_month = moment().endOf('month').format("YYYY-MM-DD HH:mm:ss");     
    console.log('startOf_month:', startOf_month);    
    console.log('endOf_month:', endOf_month);    

    let conn = await pool.getConnection();

    for(month_count= 0;month_count <= 12 ;++month_count)
    {
        ts_range_sta = moment(startOf_month).subtract(month_count,'month').format('YYYY-MM-DD HH:mm:ss');
        console.log('ts_range_sta: ', ts_range_sta);

        ts_range_fin = moment(endOf_month).subtract(month_count,'month').format('YYYY-MM-DD HH:mm:ss');   
        console.log('ts_range_fin:', ts_range_fin);   
       
        selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between ? and ?';
        myquery = mysql.format(selectQuery, ["value1", "sensordata", ts_range_sta, ts_range_fin ]);
        //--
        console.log('db.js-> sql_sum_monthly: ', myquery); 
        let [resultSet, fields] = await conn.query(myquery);
        mydataset.data.push(resultSet[0].mysoma);
        mydataset.label.push(moment(ts_range_sta).format("YY/MM"));
    }
    conn.release();

    console.log('db.js->sql_sum_monthly()-> mydataset: ', mydataset);
    console.log('db.js->sql_sum_monthly()-> saiu...');  

    return mydataset;   
}

//query = 
async function sql_sum_daily_current_month(_tagsensor) {
    console.log('db.js->sql_sum_daily_current_month()-> ... entrei');
    
    let mydataset = {
        data  : [],
        label : []
    };

    let day_now = moment().date();
    console.log('day_now: ', day_now); 

    let startOf_month = moment().startOf('month').format("YYYY-MM-DD HH:mm:ss"); 
    console.log('startOf_month:', startOf_month);    

    //let ts_range_sta = moment(startOf_month).add(1,'day').format('YYYY-MM-DD HH:mm:ss');
    //console.log('ts_range_sta:', ts_range_sta); 

    //let ts_range_fin = moment(ts_range_sta).endOf('day').format('YYYY-MM-DD HH:mm:ss');   
    //console.log('ts_range_fin:', ts_range_fin);   

    let conn = await pool.getConnection();

    for(day_count= 0;day_count < day_now;++day_count)
    {
        ts_range_sta = moment(startOf_month).add(day_count,'day').format('YYYY-MM-DD HH:mm:ss');
        console.log('ts_range_sta: ', ts_range_sta);

        let ts_range_fin = moment(ts_range_sta).endOf('day').format('YYYY-MM-DD HH:mm:ss');   
        console.log('ts_range_fin:', ts_range_fin);   
       
        let selectQuery = 'SELECT SUM(??) AS mysoma FROM ?? where reading_time between ? and ?';
        myquery = mysql.format(selectQuery, ["value1", "sensordata", ts_range_sta, ts_range_fin ]);
        //--
        console.log('db.js-> myquery1: ', myquery); 
        //let conn = await pool.getConnection();
        let [resultSet, fields] = await conn.query(myquery);
        mydataset.data.push(resultSet[0].mysoma);
        mydataset.label.push(moment(ts_range_sta).format("MM/DD"));
    }
    conn.release();

    console.log('db.js->sql_sum_daily_current_month()-> mydataset: ', mydataset);
    console.log('db.js->sql_sum_daily_current_month()-> saiu...');  

    return mydataset;   
}

module.exports = {
    queryRow, 
    sql_sum_day,    
    sql_sum_day2, 
    sql_sum_7day, 
    sql_sum_daily_current_month,
    sql_sum_monthly    
}


