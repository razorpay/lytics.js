const puppeteer = require('puppeteer');
const fastify = require('fastify')();
const serveStatic = require('serve-static');
const path = require('path');
const chai = require('chai');

const puppeteerOpts = {
  headless: true
};

let browser;
let page;

const server = {
  protocol: process.env.PROTOCOL || 'http',
  address: process.env.ADDRESS || '127.0.0.1',
  port: process.env.PORT || 3000
}

const sleep = (ms = 0) => new Promise(resolve => {
  setTimeout(resolve, ms);
})

describe('browser tests', async () => {
  before(async () => {
    fastify.use('/', serveStatic(path.join(__dirname, 'dist')));
    fastify.listen(server.port, server.address);
  
    browser = await puppeteer.launch(puppeteerOpts);
    page = await browser.newPage();
  });
  
  it('checks if window.lytics exists', async () => {
    await page.goto(`${server.protocol}://${server.address}:${server.port}/test.html`);
    const exists = await page.evaluate(() => typeof window.lytics !== 'undefined');
    chai.assert.equal(exists, true);
  });

  it('tracks event on click', async () => {
    await page.goto(`${server.protocol}://${server.address}:${server.port}/test.html`);
    await page.click('input');
    await sleep(100);

    const eventList = await page.evaluate(() => window.eventList);

    chai.assert.equal(eventList.length, 2);

    chai.expect(eventList[0]).to.have.property('trigger');
    chai.expect(eventList[0]).to.have.property('type');
    chai.assert.equal(eventList[0].trigger, 'click');
    chai.assert.equal(eventList[0].type, 'input');

    chai.expect(eventList[1]).to.have.property('trigger');
    chai.expect(eventList[1]).to.have.property('foo');
    chai.assert.equal(eventList[1].trigger, 'click');
    chai.assert.equal(eventList[1].foo, 'bar');
  });

  after(async () => {
    await browser.close();
  })
});
