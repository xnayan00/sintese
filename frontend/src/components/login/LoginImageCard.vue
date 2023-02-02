<template>
  <q-img
    class="images-border shadow-18"
    :src="src"
    width="400px"
    height="400px"
  />
</template>

<script>
  import img01 from '@/assets/images/login/login-image-01.jpg'
  import img02 from '@/assets/images/login/login-image-02.jpg'
  import img03 from '@/assets/images/login/login-image-03.jpg'
  import img04 from '@/assets/images/login/login-image-04.jpg'
  import img05 from '@/assets/images/login/login-image-05.jpg'
  import img06 from '@/assets/images/login/login-image-06.jpg'
  import img07 from '@/assets/images/login/login-image-07.jpg'
  import img08 from '@/assets/images/login/login-image-08.jpg'
  import img09 from '@/assets/images/login/login-image-09.jpg'
  import img10 from '@/assets/images/login/login-image-10.jpg'
  import img11 from '@/assets/images/login/login-image-11.jpg'
  import img12 from '@/assets/images/login/login-image-12.jpg'
  import img13 from '@/assets/images/login/login-image-13.jpg'
  import img14 from '@/assets/images/login/login-image-14.jpg'
  import img15 from '@/assets/images/login/login-image-15.jpg'
  
  export default {  
    data () {
      return {
        imgs: [img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11, img12, img13, img14, img15]
      }
    },
    computed: {
      src() {
        let idx = Math.floor(Math.random(0, 14) * 15)
        return this.imgs[idx]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .images-border {
    border-radius: 15px;
  }
</style>