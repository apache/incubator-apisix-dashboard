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
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Button, notification, Input } from 'antd';
import moment from 'moment';

import { history, useIntl } from 'umi';
import { fetchList, remove } from './service';

const Page: React.FC = () => {
  const ref = useRef<ActionType>();
  const [search, setSearch] = useState('');
  const { formatMessage } = useIntl();

  const columns: ProColumns<ConsumerModule.ResEntity>[] = [
    {
      title: formatMessage({ id: 'consumer.list.username' }),
      dataIndex: 'username',
    },
    {
      title: formatMessage({ id: 'consumer.list.description' }),
      dataIndex: 'desc',
    },
    {
      title: formatMessage({ id: 'consumer.list.update.time' }),
      dataIndex: 'update_time',
      render: (text) => `${moment.unix(Number(text)).format('YYYY-MM-DD HH:mm:ss')}`,
    },
    {
      title: formatMessage({ id: 'consumer.list.operation' }),
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => history.push(`/consumer/${record.id}/edit`)}
          >
            {formatMessage({ id: 'consumer.list.edit' })}
          </Button>
          <Popconfirm
            title={formatMessage({ id: 'consumer.list.delete.confirm' })}
            okText={formatMessage({ id: 'consumer.list.confirm' })}
            cancelText={formatMessage({ id: 'consumer.list.cancel' })}
            onConfirm={() => {
              remove(record.id).then(() => {
                notification.success({
                  message: formatMessage({ id: 'consumer.list.delete.success' }),
                });
                /* eslint-disable no-unused-expressions */
                ref.current?.reload();
              });
            }}
          >
            <Button type="primary" danger>
              {formatMessage({ id: 'consumer.list.delete' })}
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageContainer title={formatMessage({ id: 'consumer.list' })}>
      <ProTable<ConsumerModule.ResEntity>
        actionRef={ref}
        columns={columns}
        rowKey="id"
        search={false}
        request={(params) => fetchList(params, search)}
        toolBarRender={(action) => [
          <Input.Search
            placeholder={formatMessage({ id: 'consumer.list.input' })}
            onSearch={(value) => {
              setSearch(value);
              action.setPageInfo({ page: 1 });
              action.reload();
            }}
          />,
          <Button type="primary" onClick={() => history.push('/consumer/create')}>
            <PlusOutlined />
            {formatMessage({ id: 'consumer.list.create' })}
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Page;
