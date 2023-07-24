'use strict';

const Controller = require('egg').Controller;

class Live extends Controller {
  async live() {
    const {
      ctx,
    } = this;
    let {
      IdName = '', status = '',
      pageSize = '10', pageCount = '1',
    } = ctx.query;
    if (status === '2') {
      status = '';
    } else {
      status = status * 1;
    }
    let total = 0;
    if (IdName === '') {
      const live = await this.app.mysql.query('SELECT * FROM live');
      total = live.length;
    } else {
      const live = await this.app.mysql.query(`SELECT * FROM live WHERE name LIKE '%${IdName}%' `);
      total = live.length;
    }
    const data = await this.app.mysql.query(`SELECT * FROM live WHERE name LIKE '%${IdName}%' and status LIKE '%${status}%' limit ${(pageCount - 1) * pageSize},${pageSize}`);
    ctx.body = {
      code: 200,
      data,
      total,
    };
  }
  async delLive() {
    const {
      ctx,
    } = this;
    const {
      id,
    } = ctx.query;
    const data = await this.app.mysql.delete('live', {
      id,
    });
    if (data.affectedRows) {
      ctx.body = {
        code: 200,
        message: '删除成功',
      };
    }

  }
  async updateLive() {
    const {
      ctx,
    } = this;
    const {
      id,
      status,
    } = ctx.request.body;
    const sql = 'update live set status=? where id=?';
    const data = await this.app.mysql.query(sql, [ status, id ]);
    if (data.affectedRows) {
      ctx.body = {
        code: 200,
        message: '该直播已关闭',
      };
    }

  }
}

module.exports = Live;
