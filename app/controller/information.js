'use strict';

const Controller = require('egg').Controller;

class Information extends Controller {
  async information() {
    const {
      ctx,
    } = this;
    const {
      name,
      status,
    } = ctx.query;
    // console.log(ctx.query);
    const data = await this.app.mysql.query(
      `SELECT * FROM infos WHERE name LIKE '%${name}%' AND status LIKE '%${status}%' ORDER BY id DESC`
    );
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  // 添加资讯管理路由数据接口
  async addInformation() {
    const {
      ctx,
    } = this;
    const {
      name,
      tit,
      price,
      date,
      created_at,
      updated_at,
      status,
    } = ctx.request.body;
    const sql = 'insert into infos (name,tit,price,date,created_at,updated_at,status) values(?,?,?,?,?,?,?)';
    const res = await this.app.mysql.query(sql, [ name, tit, price, date, created_at, updated_at, status ]);
    if (res.affectedRows) {
      ctx.body = {
        code: 200,
        message: '添加成功',
      };
    } else {
      ctx.body = {
        code: 400,
        message: '添加失败',
      };
    }
  }
  // 修改资讯管理路由数据接口
  async editInformation() {
    const {
      ctx,
    } = this;
    const {
      content,
    } = ctx.request.body;
    const res = await this.app.mysql.update('infos', content);
    if (res.affectedRows) {
      ctx.body = {
        code: 200,
        message: '修改成功',
      };
    } else {
      ctx.body = {
        code: 400,
        message: '修改失败',
      };
    }
  }
  // 删除资讯管理路由数据接口
  async delInformation() {
    const {
      ctx,
    } = this;
    const {
      id,
    } = ctx.query;
    await this.app.mysql.delete('infos', {
      id,
    });
    ctx.body = {
      code: 200,
      message: '删除成功',
    };
  }

  // 修改资讯状态接口
  async setInformation() {
    const {
      ctx,
    } = this;
    const {
      id,
      status,
    } = ctx.request.body;
    let sta = 0;
    if (status === 0) {
      sta = 1;
    } else {
      sta = 0;
    }
    // status = status == 0 ? 1 : 0;
    await this.app.mysql.update('infos', {
      id,
      status: sta,
    });
    ctx.body = {
      code: 200,
      message: '修改成功',
    };
  }
}

module.exports = Information;
