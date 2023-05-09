const request = require('supertest')
const app = require('./server')

describe('GET /', ()=>{
    it('get index', function() {
        return request(app)
            .get('/')
            .expect(200)
    })
})
