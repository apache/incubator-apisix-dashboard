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
import { FormInstance } from 'antd/es/form';
import { Empty } from 'antd';
import { useIntl } from 'umi';

import BasicAuth from './basic-auth';
import ApiBreaker from './api-breaker';

type Props = {
  name: string,
  form: FormInstance,
  renderForm: boolean
}

export const PLUGIN_UI_LIST = ['basic-auth', 'api-breaker'];

export const PluginForm: React.FC<Props> = ({ name, renderForm, form }) => {

  const { formatMessage } = useIntl();

  if (!renderForm) { return <Empty description={formatMessage({ id: 'component.global.noConfigurationRequired' })} /> };

  switch (name) {
    case 'basic-auth':
      return <BasicAuth form={form} />
    case 'api-breaker':
      return <ApiBreaker form={form} />
    default:
      return null;
  }
}
