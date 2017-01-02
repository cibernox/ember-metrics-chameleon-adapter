import { moduleFor, test } from 'ember-qunit';

moduleFor('metrics-adapter:chameleon', 'chameleon adapter');

test('#identify', function(assert) {
  var adapter = this.subject({ config: { token: '123' } });
  adapter.identify({ some: 'option' });
  assert.deepEqual(window.chmln.identify_a[0][0], { some: 'option' });
});
