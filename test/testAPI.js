var expect = require('chai').expect;
var request = require('request');

describe('Server', function () {
    it('API is running', function (done) {
        request('http://localhost:5015/converter', function (error, response, body) {
            expect(body).to.equal('OK');
            done();
        });
    });
});

describe('API', function () {
    it('Example 1 (email)', function (done) {
        request.post({
            headers: {'content-type' : 'text/plain'},
            url:     'http://localhost:5015/converter',
            body:    "<payment><amount>10.00</amount><from>Evan</from><to>PayStand</to></payment>"
          }, function(error, response, body){
            expect(body).to.equal('{"payment":{"amount":"10.00","from":"Evan","to":"PayStand"}}');
            done();
          });
    });

    it('Example 2 (email)', function (done) {
        request.post({
            headers: {'content-type' : 'text/plain'},
            url:     'http://localhost:5015/converter',
            body:    "<shipment><item>some item</item><from>Evan</from><to>PayStand</to><address><street>100 Enterprise Way</street><city>Scotts Valley</city><zip>95066</zip></address></shipment>"
          }, function(error, response, body){
            expect(body).to.equal('{"shipment":{"item":"some item","from":"Evan","to":"PayStand","address":{"street":"100 Enterprise Way","city":"Scotts Valley","zip":"95066"}}}');
            done();
          });
    });

    it('Empty', function (done) {
        request.post({
            // headers: {'content-type' : 'text/plain'},
            url:     'http://localhost:5015/converter',
            body:    ""
          }, function(error, response, body){
            expect(body).to.equal('Invalid XML');
            done();
          });
    });

    it('Failed', function (done) {
        request.post({
            // headers: {'content-type' : 'text/plain'},
            url:     'http://localhost:5015/converter',
            body:    ""
          }, function(error, response, body){
            expect(body).to.equal('');
            done();
          });
    });
});
