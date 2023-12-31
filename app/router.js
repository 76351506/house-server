"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  // ----------------------------后台管理-------------------------------- //
  // 登录
  router.post("/login", controller.login.login);
  //获取左侧菜单栏数据
  router.get("/sider", controller.home.sider);
  //获取经纪人列表
  router.get("/broker", controller.broker.broker);
  //删除经纪人列表
  router.delete("/del/broker", controller.broker.delBroker);
  // 修改经纪人状态接口
  router.post("/set/BrokerStatus", controller.broker.setBrokerStatus);
  // 添加经纪人状态接口
  router.put("/add/Broker", controller.broker.putBroker);
  // 获取资讯列表
  router.get("/information", controller.information.information);
  // 资讯管理删除接口
  router.delete("/del/information", controller.information.delInformation);
  // 修改资讯状态接口
  router.post("/set/information", controller.information.setInformation);
  // 获取订单列表
  router.get("/order", controller.order.order);
  // 订单管理删除接口
  router.delete("/del/order", controller.order.delOrder);
  // 获取审核列表
  router.get("/audit", controller.audit.audit);
  // 审核管理删除接口
  router.delete("/del/audit", controller.audit.delAudit);
  // 审核管理删除接口
  router.post("/set/audit", controller.audit.setAudit);
  // 获取房源列表
  router.get("/housing", controller.housing.housing);
  // 销售楼盘删除接口
  router.delete("/deleteMarkethouses", controller.housing.deleteMarkethouses);
  // 修改销售楼盘状态接口
  router.post("/setMarketHouseStatus", controller.housing.setMarketHouseStatus);
  // 获取房源管理页面销售经纪人数据接口
  router.get("/setMarketBroker", controller.housing.setMarketBroker);
  // 修改房源管理页面销售经纪人数据接口
  router.post("/alterMarketBroker", controller.housing.alterMarketBroker);
  // 获取二手房源列表
  router.get("/second/housing", controller.housing.secondHousing);
  // 房屋租赁删除接口
  router.delete("/deleteRenthouses", controller.housing.deleteRenthouses);
  // 修改房屋租赁状态接口
  router.post("/setRentHouseStatus", controller.housing.setRentHouseStatus);
  // 修改房源管理房屋租赁经纪人数据接口
  router.post("/alterRentBroker", controller.housing.alterRentBroker);
  // 获取团购列表
  router.get("/group", controller.group.group);
  // 删除团购列表
  router.delete("/del/group", controller.group.delGroup);
  // 设置团购列表
  router.post("/set/group", controller.group.setGroup);
  // 获取直播列表
  router.get("/live", controller.live.live);

  // ----------------------------客户端（移动）-------------------------------- //
  // 获取房源
  router.get("/renting", controller.housing.getRenting);
  // 获取房源详情
  router.get("/detail", controller.housing.getDetail);
  // 获取地图所有有房的列表
  router.get("/mapList", controller.map.getMaps);
};
