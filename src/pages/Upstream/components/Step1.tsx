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
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useIntl } from 'umi';

import UpstreamForm, { DEFAULT_UPSTREAM } from '@/components/Upstream';

type Props = {
  form: FormInstance;
  disabled?: boolean;
};

const initialValues = DEFAULT_UPSTREAM;

const Step1: React.FC<Props> = ({ form, disabled }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Form labelCol={{ span: 3 }} form={form} initialValues={initialValues}>
        <Form.Item
          label={formatMessage({ id: 'upstream.step.name' })}
          name="name"
          rules={[{ required: true }]}
          extra={formatMessage({ id: 'upstream.step.name.should.unique' })}
        >
          <Input
            placeholder={formatMessage({ id: 'upstream.step.input.upstream.name' })}
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item label={formatMessage({ id: 'upstream.step.description' })} name="desc">
          <Input.TextArea
            placeholder={formatMessage({ id: 'upstream.step.input.description' })}
            disabled={disabled}
          />
        </Form.Item>
      </Form>
      <UpstreamForm form={form} />
    </>
  );
};

export default Step1;
