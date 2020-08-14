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
import React from 'react';
import { RequestConfig } from 'umi';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
  TopNavHeaderProps,
} from '@ant-design/pro-layout';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { queryCurrent } from '@/services/user';
import { getMenuData, errorHandler } from '@/helpers';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: LayoutSettings;
}> {
  // 如果是设置页面，不执行
  if (history.location.pathname !== '/settings' && !localStorage.getItem('GLOBAL_SETTING_API_BASE_URL')) {
    notification.error({ message: '请设置 API 地址' });
    history.push(`/settings?redirect=${encodeURIComponent(history.location.pathname)}`);
    return {};
  }
  
  const currentUser = await queryCurrent();
  return {
    currentUser,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps & TopNavHeaderProps => {
  return {
    headerRender: undefined,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    menuDataRender: getMenuData,
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  prefix: '/apisix/admin',
  errorHandler,
  credentials: 'same-origin',
  requestInterceptors: [
    (url, options) => {
      const newOptions = options;
      newOptions.headers = {
        ...options.headers,
        Authorization: localStorage.getItem('token') || '',
      };
      return {
        url,
        options: { ...newOptions, interceptors: true },
      };
    },
  ],
};
