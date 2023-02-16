'use strict';

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

const wait = (ms) => new Promise(res => setTimeout(res, ms));
module.exports.screenRecord = async (option) => {
  option = Object.assign({
    fps: 50,
    width: 1920,
    height: 1080,
    scale: 2,
    startSelector: '#state[data-state=start]',
    startTimeout: 1000 * 60,
    stopSelector: '#state[data-state=stop]',
    stopTimeout: 1000 * 60 * 60
  }, option)
  const { url, output } = option
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: option.width, height: option.height, deviceScaleFactor: option.deviceScaleFactor });

    const recorder = new PuppeteerScreenRecorder(page, {fps: option.fps});
    await page.goto(url);
    await page.waitForSelector(option.startSelector, {
      timeout: option.startTimeout
    })
    recorder.start(output)
    await page.waitForSelector(option.stopSelector, {
      timeout: option.stopTimeout
    })
    await recorder.stop();
  } catch (e) {
    console.log(e)
  } finally {
    await browser.close();
  }
}
