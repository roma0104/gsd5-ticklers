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
					"title": "$:/temp/alert/" + title,
					"modified": tiddler.fields.gsd_tickdate,
					"component": title,
					"text": "[[Go to Action|" + title + "]]",
					"tags": "$:/tags/Alert"
				});
				$tw.wiki.addTiddler(alertTiddler);
				clearTickdate(tiddler);
			}
		}
	}
}

/* Current we must clear the gsd_tickdate field to avoid the recreation of ticklers after the user has deleted the tickler. */
function clearTickdate(tiddler) {
	if(tiddler.fields.gsd_tickdays) {
		var day = parseInt(tiddler.fields.gsd_tickdays);
	}
	if(day !== NaN || day !== 0) {
		var alert_date = $tw.utils.parseDate(tiddler.fields.gsd_tickdate);
		alert_date.setTime(alert_date.getTime() + day * 86400000);
		$tw.wiki.addTiddler(new $tw.Tiddler(tiddler,{"gsd_tickdate":$tw.utils.stringifyDate(alert_date)}));
	} else {
		$tw.wiki.addTiddler(new $tw.Tiddler(tiddler,{"gsd_tickdate":undefined}));
	}
}

})();
