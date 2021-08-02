var mysql = require('mysql');

global.con = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

con.connect(function(err) {
  if (err) throw err;
  debug('Database connected');

  con.query("CREATE TABLE IF NOT EXISTS iot_watermeters (ID BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT, date_created DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00', date_updated DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00', title TEXT, type VARCHAR(20), status VARCHAR(20) NOT NULL DEFAULT 'publish', author TEXT NOT NULL DEFAULT 'unknown')", function (err, result) {
    if (err) return;
    if (result.warningCount === 0) debug("Table iot_watermeters created");
  });

  con.query("CREATE TABLE IF NOT EXISTS iot_watermetermeta (meta_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT, iot_watermeter_id BIGINT(20) UNSIGNED NOT NULL DEFAULT 0, meta_key VARCHAR(255), meta_value LONGTEXT)", function (err, result) {
    if (err) return;
    if (result.warningCount === 0) debug("Table iot_watermetermeta created");
  });
});