<template>
  <div>
    <Xgplayer :config="config" @player="Player = $event"/>
  </div>
</template>

<script>
  import Xgplayer from 'xgplayer-vue';
  import {mapState,mapActions} from "vuex";
  export default {
    name: "VideoPlayer",
    props:['currentStep'],
    components:{
      Xgplayer
    },
    mounted() {
      if(this.currentStep){
        this.Player.start(this.currentStep['resourse'])
        this.Player.poster = this.currentStep['purl']
        this.$nextTick(()=>{
          this.playHandle();
        })
      }
    },
    watch:{
      currentPlayIndex(newValue,oldValue){
        if(newValue===oldValue) return;
        this.Player.start(this.currentStep['resourse'])
        this.Player.src=this.currentStep['resourse'];
        this.Player.poster = this.currentStep.purl
        this.$nextTick(()=>{
          this.playHandle();
        })
      }
    },
    methods:{
      playHandle(){
        if(!this.course['userState']&&!this.audioList[this.currentPlayIndex]['tryFlag']){
          this.setShowTip(true)
        }
        this.Player.play();
      },
      ...mapActions({
        setShowTip:'app/setShowTip'
      })
    },
    computed:{
      ...mapState({
        currentPlayIndex:state => state.media.currentPlayIndex,
        course:state => state.media.course,
        audioList:state => state.media.audioList,
      })
    },
    data(){
      return{
        config:{
          id: 'vs',
          url: '/',
          playsinline: true,
          width: '100%',
          height: 280,
          'x5-video-player-fullscreen':true,
          poster: '/',
          closeVideoTouch:true,
          playbackRate: [0.5, 0.75, 1, 1.5, 2],
          defaultPlaybackRate: 1
        },
        Player: null
      }
    }
  }
</script>

<style scoped>

</style>
