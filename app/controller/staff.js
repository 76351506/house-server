'use strict';

const Controller = require('egg').Controller;

class Staff extends Controller {
  // 获取员工列表
  async staff() {
    const {
      ctx,
    } = this;
    const {
      depart_name = '',
    } = ctx.query;
    const data = await this.app.mysql.query(
      `SELECT * FROM staff WHERE head_name LIKE '%${depart_name}%' ORDER BY id DESC`
    );
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  // 删除员工列表
  async delstaff() {
    const {
      ctx,
    } = this;
    const {
      id,
    } = ctx.query;
    await this.app.mysql.delete('staff', {
      id,
    });
    ctx.body = {
      code: 200,
      message: '删除成功',
    };
  }
  // 修改员工列表
  async setstaff() {
    const {
      ctx,
    } = this;
    const {
      id,
      depart_name,
      head_name,
      duties,
      tel,
    } = ctx.request.body;
    await this.app.mysql.update('staff', {
      id,
      depart_name,
      head_name,
      duties,
      tel,
    });
    ctx.body = {
      code: 200,
      message: '修改成功',
    };
  }
  // 添加员工列表
  async putstaff() {
    const {
      ctx,
    } = this;
    const {
      depart_name,
      tel,
      head_name,
      duties,
      staffid,
      getpassword,
    } =
    ctx.request.body;
    const sql = 'insert into staff (depart_name,tel,head_name,duties,staffid,getpassword) values(?,?,?,?,?,?)';
    const res = await this.app.mysql.query(sql, [
      depart_name,
      tel,
      head_name,
      duties,
      staffid,
      getpassword,
    ]);
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
}

module.exports = Staff;
