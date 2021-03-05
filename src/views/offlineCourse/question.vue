<template>
  <div class="page-box">
    <div class="question-container">
      <div class="title-box">{{voteName}}</div>
      <div class="question-list" v-for="item in questions">
        <div class="title">
          <span>{{item['questionType']===1?'单选':item['questionType']===2? '多选': '填空'}}</span>
          {{item['questionName']}}
        </div>
        <van-radio-group v-model="form[item['id']]" v-if="item['questionType']===1">
          <div class="question-item" v-for="item2 in item['options']">
            <van-radio :name="item2['id']" label-disabled/>
            <p>{{item2['optionName']}}</p>
          </div>
        </van-radio-group>
        <van-checkbox-group v-model="form[item['id']]" v-if="item['questionType']===2">
          <div class="question-item" v-for="item2 in item['options']">
            <van-checkbox :name="item2['id']"/>
            <p>{{item2['optionName']}}</p>
          </div>
        </van-checkbox-group>
        <van-checkbox-group v-if="item['questionType']===3">
          <div class="question-item">
            <van-field
              v-model="form[item['id']]"
              style="background: #F5F5F5"
              name="用户名"
              placeholder="请输入内容"
            />
          </div>
        </van-checkbox-group>
      </div>
      <div class="bottom-box">
        <van-button
          @click="submitHandle"
          round
          block
          type="info"
        >
          完成提交
        </van-button>
      </div>
      <van-popup
        round
        v-model="showPopup"
        :close-on-click-overlay="false"
      >
        <div class="popup-container">
          <div class="title-box">
            <img src="./img/submitSuccess.png" alt="">
            <p>提交成功</p>
          </div>
          <div class="btn-group-box">
            <van-button
              @click="goBackHandle"
              round
              block
              type="info"
            >
              {{codeTime}}s后跳转至报名
            </van-button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {getVote, submitVote} from '../../api'
  import {mapGetters} from "vuex";
  import {Toast} from 'vant'

  export default {
    name: "question",
    data() {
      return {
        showPopup: false,
        codeTime: 5,
        voteId:'',
        voteName: '',
        questions: [],
        form: {}
      }
    },
    computed:{
      ...mapGetters({
        userInfo: 'userInfo'
      }),
    },
    mounted() {
      getVote().then(res => {
        const {voteName, questions, voteId} = res
        this.voteName = voteName
        this.voteId = voteId
        questions.forEach(item => {
          this.$set(this.form, [item['id']], item['questionType'] === 2 ? [] : '');
        })
        this.questions = questions
      })
    },
    methods: {
      submitHandle() {
        const formValues=Object.values(this.form);
        for (let i=0;i<formValues.length;i++){
          if(Array.isArray(formValues[i])){
            if(!formValues[i].length){
              Toast('必须全部填完');
              return
            }
          }else {
            if(formValues[i]===''){
              Toast('必须全部填完');
              return
            }
          }
        }
        submitVote({
          voteId: this.voteId,
          map: this.form,
          nickname:this.userInfo['nickname']
        }).then(() => {
          this.countDownHandle()
        })
      },
      goBackHandle(){
        this.$router.replace({
          path:'/offlineCourse/detail',
          query:{
            id:this.$route.query.id,
            auth:true
          }
        })
      },
      countDownHandle() {
        this.showPopup=true
        this.timer = setInterval(() => {
          this.codeTime = this.codeTime - 1
          if (this.codeTime === 0) {
            clearInterval(this.timer);
            this.goBackHandle()
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="scss">
  .question-container {
    width: 100%;
    min-height: 100vh;
    background: #ffffff;

    .title-box {
      font-size: 21px;
      font-weight: bold;
      color: #333333;
      line-height: 29px;
      padding: 18px 18px 10px;
    }

    .question-list {
      padding: 10px 0;

      .title {
        font-size: 15px;
        font-weight: 500;
        color: #333333;
        line-height: 21px;
        padding: 12px 18px;
        display: flex;
        align-items: center;

        span {
          display: inline-block;
          margin-right: 5px;
          width: 31px;
          height: 16px;
          background: #2C80FF;
          border-radius: 8px 8px 0px 8px;
          color: #ffffff;
          font-size: 9px;
          font-weight: 500;
          text-align: center;
          line-height: 16px;
        }
      }

      .question-item {
        width: 100%;
        display: flex;
        align-items: flex-start;
        box-sizing: border-box;
        padding: 12px 18px;

        p {
          width: 90%;
          line-height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #656667;
          margin-left: 16px;
        }
      }
    }

    .bottom-box {
      width: 100%;
      height: 70px;
      background: #ffffff;
      box-sizing: border-box;
      padding: 10px 12px;

    }

    .popup-container {
      width: 320px;
      padding: 10px;
      box-sizing: border-box;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 12px;

      .title-box {
        width: 230px;
        box-sizing: border-box;
        padding: 25px 0 10px;
        font-size: 18px;
        font-weight: 500;
        color: #353535;
        line-height: 24px;
        text-align: center;

        img {
          width: 78px;
          height: 78px;
        }
      }

      .btn-group-box {
        width: 100%;
        box-sizing: border-box;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
