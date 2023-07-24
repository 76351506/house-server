'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.get('/', controller.home.index);
  // ----------------------------后台管理-------------------------------- //
  // 登录sendCode
  router.post('/telLogin', controller.user.telLogin);
  // 登录
  router.post('/login', controller.user.login);
  // 注册
  router.post('/registry', controller.user.registry);
  // 修改用户editUser
  router.post('/editUser', controller.user.editUser);
  // 发送Code
  router.get('/sendCode', controller.user.sendCode);
  // 获取用户列表
  router.get('/userInfo', controller.userInfo.userInfo);
  // 删除用户
  router.delete('/delUser', controller.userInfo.delUser);
  // 上传图片
  router.post('/upload', controller.user.upload);
  // 获取左侧菜单栏数据
  router.get('/sider', controller.home.sider);
  // 获取经纪人列表
  router.get('/broker', controller.broker.broker);
  // 删除经纪人列表
  router.delete('/del/broker', controller.broker.delBroker);
  // 修改经纪人状态接口
  router.post('/set/BrokerStatus', controller.broker.setBrokerStatus);
  // 添加经纪人状态接口
  router.put('/add/Broker', controller.broker.putBroker);
  // 获取资讯列表
  router.get('/information', controller.information.information);
  // 添加资讯列表
  router.post('/addInformation', controller.information.addInformation);
  // 编辑资讯列表
  router.post('/editInformation', controller.information.editInformation);
  // 资讯管理删除接口
  router.delete('/del/information', controller.information.delInformation);
  // 修改资讯状态接口
  router.post('/set/information', controller.information.setInformation);
  // 获取订单列表
  router.get('/order', controller.order.order);
  // 订单管理删除接口
  router.delete('/del/order', controller.order.delOrder);
  // 获取审核列表
  router.get('/audit', controller.audit.audit);
  // 审核管理删除接口
  router.delete('/del/audit', controller.audit.delAudit);
  // 审核管理删除接口
  router.post('/set/audit', controller.audit.setAudit);
  // 获取房源列表
  router.get('/housing', controller.housing.housing);
  // 销售楼盘删除接口
  router.delete('/deleteMarkethouses', controller.housing.deleteMarkethouses);
  // 添加房源
  router.post('/addHousing', controller.housing.addHouses);
  // 编辑房源
  router.put('/updateHousing', controller.housing.upDateHouses);
  // 修改销售楼盘状态接口
  router.post('/setMarketHouseStatus', controller.housing.setMarketHouseStatus);
  // 获取房源管理页面销售经纪人数据接口
  router.get('/setMarketBroker', controller.housing.setMarketBroker);
  // 修改房源管理页面销售经纪人数据接口
  router.post('/alterMarketBroker', controller.housing.alterMarketBroker);
  // 获取二手房源列表
  router.get('/second/housing', controller.housing.secondHousing);
  // 房屋二手房删除接口
  router.delete('/deleteRenthouses', controller.housing.deleteRenthouses);
  // 修改房屋二手房状态接口
  router.post('/setRentHouseStatus', controller.housing.setRentHouseStatus);
  // 修改房源管理房屋二手房经纪人数据接口
  router.post('/alterRentBroker', controller.housing.alterRentBroker);
  // 添加二手房源
  router.post('/addSecondHousing', controller.housing.addSecondHouses);
  // 编辑二手房源
  router.put('/updateSecondHousing', controller.housing.upDateSecondHouses);
  // 获取团购列表
  router.get('/group', controller.group.group);
  // 删除团购列表
  router.delete('/del/group', controller.group.delGroup);
  // 设置团购列表
  router.post('/set/group', controller.group.setGroup);
  // 获取直播列表
  router.get('/live', controller.live.live);
  // 删除直播
  router.delete('/delLive', controller.live.delLive);
  // 修改直播
  router.post('/updateLive', controller.live.updateLive);
  // 获取部门列表
  router.get('/department', controller.department.department);
  // 修改部门列表
  router.post('/setdepartment', controller.department.setdepartment);
  // 删除部门列表
  router.delete('/deldepartment', controller.department.deldepartment);
  // 添加部门列表
  router.put('/putdepartment', controller.department.putdepartment);
  // 获取员工列表
  router.get('/staff', controller.staff.staff);
  // 修改员工列表
  router.post('/setstaff', controller.staff.setstaff);
  // 删除员工列表
  router.delete('/delstaff', controller.staff.delstaff);
  // 添加员工列表
  router.put('/putstaff', controller.staff.putstaff);

  // ----------------------------客户端（移动）-------------------------------- //
  // 获取房源
  router.get('/renting', controller.housing.getRenting);
  // 获取房源详情
  router.get('/detail', controller.housing.getDetail);
  // 获取地图所有有房的列表
  router.get('/mapList', controller.map.getMaps);
};
