'use strict';

const Controller = require('egg').Controller;

class Department extends Controller {
  // 获取部门列表
  async department() {
    const { ctx } = this;
    const {
      depart_name = '',
    } = ctx.query;
    const data = await this.app.mysql.query(
      `SELECT * FROM department WHERE depart_name LIKE '%${depart_name}%' ORDER BY id DESC`
    );
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  // 删除部门列表
  async deldepartment() {
    const { ctx } = this;
    const { id } = ctx.query;
    await this.app.mysql.delete('department', { id });
    ctx.body = {
      code: 200,
      message: '删除成功',
    };
  }
  // 修改部门列表
  async setdepartment() {
    const { ctx } = this;
    const { id, depart_name, head_name, duties, tel } = ctx.request.body;
    await this.app.mysql.update('department', { id, depart_name, head_name, duties, tel });
    ctx.body = {
      code: 200,
      message: '修改成功',
    };
  }
  // 添加部门列表
  async putdepartment() {
    const {
      ctx,
    } = this;
    const {
      depart_name,
      tel,
      head_name,
      duties,
      staff_num,
    } = ctx.request.body;
    await this.app.mysql.insert('department', {
      depart_name,
      tel,
      head_name,
      duties,
      staff_num,
    });
    ctx.body = {
      code: 200,
      message: '插入成功',
    };
  }
}

module.exports = Department;
