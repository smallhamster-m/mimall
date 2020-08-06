<template>
  <div class="order-list">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <loading v-if="showLoading">
          <template v-slot:tip>
            <div>订单加载中...</div>
          </template>
        </loading>
        <div class="order-box">
          <div class="order" v-for="(listitem, index) in list" :key="index">
            <div class="order-title cl">
              <div class="item-info fl">
                {{ listitem.createTime }}
                <span>|</span>
                {{ listitem.receiverName }}
                <span>|</span>
                {{ listitem.orderNo }}
                <span>|</span>
                {{ listitem.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ listitem.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content cl">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item, i) in listitem.orderItemVoList"
                  :key="i"
                >
                  <div class="good-img">
                    <img :src="item.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ item.productName }}</div>
                    <div class="p-money">
                      {{ item.totalPrice }} X {{ item.quantity }}件
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" >
                <div v-if="listitem.status == 10">
                  <a href="javascript:;"  class="cancle" @click="cancleOrder(listitem.orderNo)">取消订单</a>
                  <a href="javascript:;" @click="goPay(listitem.orderNo)">{{listitem.statusDesc}}</a>
                </div>
                <div v-else>
                  <a href="javascript:;">{{listitem.statusDesc}}</a>
                </div>
              </div>
            </div>
          </div>
          <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="handleChange"
          ></el-pagination>
        </div>
        <no-data v-if="list.length == 0 && !showLoading"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from 'components/OrderHeader'
import Loading from 'components/Loading'
import NoData from 'components/NoData'
import { Pagination } from 'element-ui';
export default {
  name: 'OrderList',
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination,
  },
  data() {
    return {
      showLoading: false,
      list: [], //订单列表
      total: 0, //订单总数
      currentPage: 1,
      pageSize: 5 //每页的订单数
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.showLoading = true
      this.axios.get('/orders', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
        }
      }).then(res => {
        this.showLoading = false
        this.list = res.list
        this.total = res.total
      })
    },
    handleChange(currentPage) {
      this.currentPage = currentPage
      this.getOrderList()
    },
    cancleOrder(orderNo) { //取消订单
      this.axios.put(`/orders/${orderNo}`).then(() => {
        this.message('取消订单成功', 'success')
        this.getOrderList()
      })
    },
    goPay(orderNo) { //去支付
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    }
  }
}

</script>
<style lang='scss'>
@import 'assets/myscss/base';
.order-list {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 33px;
    padding-bottom: 110px;
    .container {
      .order-box {
        .order {
          background-color: #fff;
          margin-bottom: 31px;
          border: 1px solid #d7d7d7;
          &:last-child {
            margin-bottom: 0;
          }
          .order-title {
            height: 74px;
            line-height: 74px;
            background-color: #fffaf7;
            padding: 0 43px;
            font-size: 16px;
            color: #666;
            .item-info {
              span {
                margin: 0 9px;
              }
            }
            .money {
              font-size: 26px;
              color: #333;
            }
          }
          .order-content {
            padding: 0 43px;
            .good-box {
              width: 85%;
              .good-list {
                display: flex;
                align-items: center;
                height: 145px;
                .good-img {
                  width: 112px;
                  img {
                    width: 100%;
                  }
                }
                .good-name {
                  font-size: 20px;
                  color: #333333;
                }
              }
            }
            .good-state {
              height: 145px;
              line-height: 145px;
              font-size: 20px;
              color: #ff6600;
              a {
                color: #ff6600;
              }
              .cancle {
                margin-right: 20px;
              }
            }
          }
        }
        .pagination {
          text-align: right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #ff6600;
          // border-radius: 50%;
        }
        .el-pagination.is-background .el-pager li:not(.disabled):hover {
          color: #ff6600;
        }
      }
    }
  }
}
</style>