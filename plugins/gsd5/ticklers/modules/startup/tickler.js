/*\
title: $:/plugins/gsd5/ticklers/modules/startup/tickler.js
type: application/javascript
module-type: startup

Tickler alert manager.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

// Export name and synchronous status
exports.name = "tickler";
//exports.platforms = ["browser"];
exports.after = ["story"];
exports.synchronous = true;

exports.startup = function() {
	$tw.wiki.forEachTiddler(checkForAlert);
	var interval = setInterval(function() {
		$tw.wiki.forEachTiddler(checkForAlert);
	}, 3600000);
};

function checkForAlert(title, tiddler) {
	var now = new Date();
	if(!tiddler) {
		return;
	}
	if(tiddler.fields.gsd_type === "action") {
		if(tiddler.fields.gsd_tickdate) {
			var alert_date = $tw.utils.parseDate(tiddler.fields.gsd_tickdate);
			if(alert_date <= now) {
				var alertTiddler = new $tw.Tiddler({
					"title": title,
					"modified": tiddler.fields.gsd_tickdate,
					"component": title,
					"tags": "$:/tags/Alert"
				});
				$tw.wiki.addTiddler(alertTiddler);
			}
		}
	}
}

})();
