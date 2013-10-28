Count Min Sketch
==============

A simple Count Min Sketch implementation for Node.

Example
-------
  ```javascript
  var CountMinSketch = require("lib/cms.js");
  var cms = new CountMinSketch();

  // Count occurances of an item in a stream
  while(item = stream.next()) {
    cms.update(item, 1);
    console.log(cms.query(item));
  }
  ```

References
----------

  * [1] http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
  * [2] https://tech.shareaholic.com/2012/12/03/the-count-min-sketch-how-to-count-over-large-keyspaces-when-about-right-is-good-enough/
