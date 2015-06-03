# Fake Google Analytics

FakeGA is simple script using casperJS to generate some visitors to your website.
Both url and user-agents are configurable. It also sends referrer to be simulate real user browsing your website.
Consider using proxy servers or tor, to generate unique visits based on IP address.

# How to install

1. Install dependencies:

```
npm install
```

2. Install casperjs
http://docs.casperjs.org/en/latest/installation.html

3. Fill journey.txt with urls

4. Optionally add some user-agents to ua.txt

# Run fakega with:

```
casperjs fakega.js
```

# Test

To test fakega.js one can use fake test server and by default journey.txt
contains url to fake nodejs server.

Run:

```
DEBUG=express:* node server.js
```

# TODO:

use proxy or tor