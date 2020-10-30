/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable import/no-extraneous-dependencies */
const puppeteer = require('puppeteer');

let browser;
const BASE_URL = `http://localhost:${process.env.PORT || 8002}`;
const domSelectors = {
  inputUserName: '#control-ref_username',
  inputPassWord: '#control-ref_password',
  buttonLogin: '.ant-btn-lg',
  notificationNotice: '.ant-notification-notice',
  notificationLogin: '.ant-notification-notice-description',
  loginSuccessIcon: '.ant-notification-notice-icon-success',
  loginFailedIcon: '.ant-notification-notice-icon-error',
};
const loginFailedData = {
  userName: 'admin',
  passWord: '123456',
};
const loginSuccessData = {
  userName: 'admin',
  passWord: 'admin',
};

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
});

describe('Login', () => {
  test('Login failed with wrong password', async () => {
    const page = await browser.newPage();
    await page.goto(BASE_URL);
    await page.type(domSelectors.inputUserName, loginFailedData.userName);
    await page.type(domSelectors.inputPassWord, loginFailedData.passWord);
    await page.click(domSelectors.buttonLogin);
    await page.waitForSelector(domSelectors.loginFailedIcon);
    await page.close();
  }, 10000);

  test('Login success then Logout', async () => {
    const page = await browser.newPage();
    await page.goto(BASE_URL);
    await page.type(domSelectors.inputUserName, loginSuccessData.userName);
    await page.type(domSelectors.inputPassWord, loginSuccessData.passWord);
    await page.click(domSelectors.buttonLogin);
    await page.waitForSelector(domSelectors.loginSuccessIcon);
    await page.close();
  }, 10000);

  afterAll(async () => {
    await browser.close();
  });
});
