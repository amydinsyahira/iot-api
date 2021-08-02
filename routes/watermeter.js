var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET water meter listing. */
router.get('/', function(req, res, next) {
  // Select table from database
  con.query("SELECT iot_watermeters.*, CONCAT('[', GROUP_CONCAT(JSON_OBJECT(iot_watermetermeta.meta_key, iot_watermetermeta.meta_value)), ']') AS watermeter FROM iot_watermeters INNER JOIN iot_watermetermeta ON iot_watermeters.ID = iot_watermetermeta.iot_watermeter_id GROUP BY iot_watermeters.ID", function (err, result) {
    if (err) return res.status(500).send(err);
    // Convert format meta
    for (let index = 0; index < result.length; index++) {
      result[index].watermeter = JSON.parse(result[index].watermeter);
    }
    res.send(result);
  });
});

/* POST new water meter data. */
router.post('/', function(req, res, next) {
  const { title, type, status, author, watermeter } = req.body;

  if (!watermeter || !watermeter.device || !watermeter.value) return res.status(400).send('Please bring the object parameters `watermeter` with `device` and `value` data');
  
  // Insert to database
  con.beginTransaction(function(err) {
    if (err) return res.status(500).send(err);
    con.query(`INSERT INTO iot_watermeters (date_created, date_updated, title, type, status, author) VALUES ('${moment().format('YYYY-MM-DD HH:mm:ss')}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', '${title || ''}', '${type || ''}', '${status || 'publish'}', '${author || 'unknown'}')`, function (err, result) {
      if (err) {
        return con.rollback(function() {
          res.status(500).send(err);
        })
      }

      let metaArr = [];
      for (const key in watermeter) {
        if (Object.hasOwnProperty.call(watermeter, key)) {
          const element = watermeter[key];
          metaArr.push([ result.insertId, key, element || '' ]);
        }
      }
      
      con.query(`INSERT INTO iot_watermetermeta (iot_watermeter_id, meta_key, meta_value) VALUES ?`, [metaArr], function (err, result) {
        if (err) {
          return con.rollback(function() {
            res.status(500).send(err);
          })
        }

        con.commit(function(err) {
          if (err) {
            return con.rollback(function() {
              res.status(500).send(err);
            })
          }
          debug("New water meter data inserted");
          res.send("New water meter data inserted");
        })
      });
    });
  });
});

/* PUT update water meter data. */
router.put('/', function(req, res, next) {
  res.send('still on progress...');
});

module.exports = router;
