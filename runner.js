var CountMinSketch = require('./lib/cms.js');
var cms = new CountMinSketch();
var murmurhash = require('murmurhash');
var set = [];
var item, i, k;

for (i = 0 ; i < 1000; i++) {
  set.push('chanian');
  cms.update('chanian', 1);
}

for (i = 0; i < 2000; i ++) {
  item = murmurhash(Math.random().toString());
  for (k = Math.random() * 1 ; k >=0 ; --k) {
    set.push(item);
    cms.update(item, 1);
  }
}

var find = set[0];
console.log('looking for %s', find);
console.log('cms: %s', cms.query(find));
var actualCount = 0;
for (i = 0; i < set.length; i++) {
  if (set[i] == find) {
    actualCount++;
  }
}

console.log('actual count %s', actualCount);
console.log("%d x %d matrix", cms.table.length, cms.table[0].length)