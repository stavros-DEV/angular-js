Build & Run Instructions
=======

**Commands:**

1. npm install
2. bower install
3. gulp watch

w4 depends on an external json-server. To start json server, move to w4 folder and issue:
json-server --watch db.json

w1 has grunt configured as task runner, so instead of "gulp watch" command, type:
grunt serve