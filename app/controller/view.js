/*
 * @Author: heinan
 * @Date: 2023-07-23 22:50:43
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 09:42:44
 */
'use strict';
const { Controller } = require('egg');

class ViewController extends Controller {
  async index() {
    const result = this.ctx.service.view.index();
    if (result.length) {
      this.ctx.body = {
        code: 1,
        message: '查询成功!',
        data: result,
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: '暂无数据!',
        data: [],
      };
    }
  }
  async create() {
    try {
      this.ctx.validate({
        view_authority_text: 'string',
        view_name: 'string',
      });
    } catch (err) {
      this.ctx.status = 406;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const result = await this.ctx.service.view.create(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: '新增成功!',
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: '新增失败!',
      };
    }
  }
  async update() {
    try {
      this.ctx.validate({
        view_authority_text: 'string',
        view_name: 'string',
      });
    } catch (err) {
      this.ctx.status = 406;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const result = await this.ctx.service.view.update({
      ...this.ctx.params,
      ...this.ctx.request.body,
    });
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: '修改成功!',
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: '修改失败!',
      };
    }
  }
  async destroy() {
    const result = await this.ctx.service.view.destroy(this.ctx.params);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: '删除成功!',
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: '删除失败!',
      };
    }
  }
}

module.exports = ViewController;