// miniprogram/pages/detail/detail.js

const app_detail = getApp<IAppOption>();
Page({
  data: {
    imgUrls: [
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg'
    ],
    groupData: app_detail.globalData.groupData,
    groupId: '1',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    // const groupId = options.groupId;
    // const imgUrls = app_detail.globalData.groupData.filter(group => group.groupId === groupId)[0]?.images;
    const imgUrls=[
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg'
    ];
    this.setData({  imgUrls });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },


})