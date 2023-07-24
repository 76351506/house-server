'use strict';

module.exports = appInfo => {
  const config = (exports = {});
  config.keys = appInfo.name + '_1636591141914_4788';
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '982500',
      database: 'house',
    },
    app: true,
    agent: false,
  };
  config.mediaServer = {
    rtmp: {
      port: 22570,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60,
    },
    http: {
      port: 22571,
      allow_origin: '*',
    },
  };
  config.multipart = {
    mode: 'file',
  };

  config.oss = { // 这里需要的东西去自己的服务器里看，我用的阿里云
    client: {
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      timeout: '60s',
      region: 'oss-cn-beijing',
    },
  };

  return config;
};
