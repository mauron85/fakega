var fs = require('fs');

// wait x miliseconds between each request
var delay = 3000;
// read list of urls and store them in array
var journey = fs.read('journey.txt').split('\n');
// read list of user agents and store them in array
var userAgents = fs.read('ua.txt').split('\n');

simulateUniqueVisitor(simulateUniqueVisitor);

function simulateUniqueVisitor(callback) {
    var i = 0;
    var userAgent = userAgents[getRandomInt(0, userAgents.length - 1)];
    var casper = require('casper').create({
        verbose: true,
        logLevel: 'debug'
    });

    casper.start(journey[i], function() {
        console.log('New unique visitor on: ' + this.getCurrentUrl() + ' userAgent: ' + userAgent);
    });
    casper.userAgent(userAgent);

    casper.wait(delay, function() {});
    // simulate clicking links as normal user will do
    (function visitUrl() {
        var targetUrl = journey[++i];
        if (!targetUrl) { return; }
        casper.then(function() {
            console.log('Visiting: ' + targetUrl);
            this.evaluate(function(targetUrl) {
                var link = document.createElement('a');
                link.setAttribute('href', targetUrl);
                link.setAttribute('id', 'myTargetUrl')
                document.body.appendChild(link);
            }, targetUrl);
        });
        casper.then(function() {
            this.click('a#myTargetUrl');
        });
        casper.wait(delay, function() {
            if (i < journey.length) {
                visitUrl();
            }
        });
    })();

    casper.run(function() {
        casper.clear();
        casper.page.close();
        phantom.clearCookies();
        callback(simulateUniqueVisitor);
    });
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}