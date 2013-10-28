/**
 * Count Min Sketch, based on:
 *
 * http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
 *
 */
var murmurhash = require('murmurhash');


/**
 * Select family of n-hash functions
 *
 * TODO: Confirm distribution of these seeds will
 * satisfy the need for pairwise independence
 */
function generateRandomFunctions(n, width) {
  var i = 0
    , hashes = []
    , hash;

  for (i = 0; i < n; i++) {
    var seed = Math.floor(1000000 * Math.random());
    hash = (function (seed) {
      return (function (item) {
        // mod width to fit into this CMS's range
        var hash = murmurhash(item.toString(), seed);
        return hash % width;
      });
    })(seed);

    hashes.push(hash);
  }
  return hashes;
}


function CountMinSketch (delta, epsilon) {
  delta   = delta || 0.00001;
  epsilon = epsilon || 0.01;

  // from pg. 5
  this.depth = Math.ceil(Math.log(1.0 / delta));
  this.width = Math.ceil(Math.exp(1) / epsilon);
  this.hashes = generateRandomFunctions(this.depth, this.width);

  this.table = new Array(this.depth);
  for (var i = 0; i < this.depth; i++) {
    this.table[i] = new Array(this.width);
    for (var k = 0; k < this.table[i].length; k++) {
      this.table[i][k] = 0;
    }
  }
}

CountMinSketch.prototype.query = function (item) {
  var i, hash, min;
  min = Infinity;
  for (i = 0; i < this.depth; i++) {
    hash = this.hashes[i](item);
    min = Math.min(min, this.table[i][hash]);
  }
  return min;
}

CountMinSketch.prototype.update = function (item, count) {
  var i, hash;
  for (i = 0; i < this.depth; i++) {
    hash = this.hashes[i](item);
    this.table[i][hash] = this.table[i][hash] + count;
  }
}

module.exports = CountMinSketch;
