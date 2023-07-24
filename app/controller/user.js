'use strict';
const Controller = require('egg').Controller;
// const fs = require('fs')
// const path = require("path");
const {
  // md5,
  createToken,
} = require('../../utils/index');

let Code = 0;
class User extends Controller {
  // 登录
  async login() {
    const {
      ctx,
    } = this;
    const {
      password,
      username,
    } = ctx.request.body;
    // 查找用户是否存在
    const data = await this.app.mysql.get('users', {
      username,
    });
    // 不存在返回不存在
    if (!data) {
      ctx.body = {
        code: 401,
        message: '用户不存在',
      };
      return;
    }
    // 判断密码是否正确
    if (data.password !== password) {
      ctx.body = {
        code: 401,
        message: '密码错误',
      };
      return;
    }
    // 删除密码
    // delete data.password;
    // 生成token
    const token = createToken({
      ...data,
    }, '24h');
    // 返回
    ctx.body = {
      code: 200,
      message: '登录成功',
      token, // 返回token,
      data,
    };
  }

  async telLogin() {
    const {
      ctx,
    } = this;
    const {
      tel,
      code,
    } = ctx.request.body;
    const data = await this.app.mysql.get('users', {
      tel,
    });
    if (data) {
      if (code === Code) {
        const token = createToken({
          ...data,
        }, '24h');
        ctx.body = {
          code: 200,
          message: '登录成功',
          token, // 返回token,
          data,
        };
      } else {
        ctx.body = {
          code: 400,
          message: '验证码错误',
        };
      }
    } else {
      ctx.body = {
        code: 400,
        message: '该用户未注册',
      };
    }
  }
  async sendCode() {
    const {
      ctx,
    } = this;
    const {
      tel,
    } = ctx.query;
    const data = await this.app.mysql.get('users', {
      tel,
    });
    // console.log(data);
    if (data) {
      Code = Math.random().toString().slice(2, 6);
      ctx.body = {
        code: 200,
        message: '发送成功',
        Code,
      };
    } else {
      ctx.body = {
        code: 400,
        message: '获取验证码失败',
      };
    }

  }
  async registry() {
    const {
      ctx,
    } = this;
    const {
      username,
      tel,
    } = ctx.request.body;
    const password = Math.random().toString().slice(2, 8);
    // 查找用户是否存在
    const data = await this.app.mysql.get('users', {
      tel,
    });
    // console.log(data);
    // 不存在注册
    if (!data) {
      const created_at = new Date().toLocaleDateString();
      const updated_at = new Date().toLocaleDateString();
      const sql = 'insert into users(username,password,tel,created_at,updated_at)values(?,?,?,?,?)';
      const data = await this.app.mysql.query(sql, [ username, password, tel, created_at, updated_at ]);
      // console.log(data);
      if (data.affectedRows) {
        ctx.body = {
          code: 200,
          msg: '注册成功',
        };
      } else {
        ctx.body = {
          code: 400,
          msg: '注册失败',
        };
      }
    } else {
      // 存在， 已注册
      ctx.body = {
        code: 400,
        msg: '该用户已注册',
      };
    }
  }

  async editUser() {
    const {
      ctx,
    } = this;
    const {
      username,
      password,
      tel,
      id,
    } = ctx.request.body;
    // 查找用户是否存在
    const data = await this.app.mysql.get('users', {
      id,
    });
    // 不存在注册
    if (data) {
      const updated_at = new Date().toLocaleDateString();
      const sql = 'update users set username=?,password=?,tel=?,updated_at=? where id=?';
      const data = await this.app.mysql.query(sql, [ username, password, tel, updated_at, id ]);
      // console.log(data);
      if (data.affectedRows) {
        ctx.body = {
          code: 200,
          msg: '注册成功',
        };
      } else {
        ctx.body = {
          code: 400,
          msg: '注册失败',
        };
      }
    }
  }
  async upload() {
    const {
      ctx,
    } = this;
    const file = ctx.request.files[0];
    if (!file) {
      ctx.body = {
        code: 400,
        message: '请选择上传文件',
      };
    }
    let result;
    try {
      result = await ctx.oss.put(file.filename, file.filepath);
    } catch (err) {
      console.log(err);
    }
    if (result) {
      ctx.body = {
        code: 200,
        message: '上传成功',
        result,
      };
    } else {
      ctx.body = {
        code: 400,
        message: '上传失败',
      };
    }
  }

}

module.exports = User;
