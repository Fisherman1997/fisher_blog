<template>
  <div class="loadingPage">
    <div id="scale_block">
      <svg viewBox="0 0 200 200">
        <path
          fill="#ffffff"
          d="M87.2,109.6c-5.3-10.9,2.9-23.8,15.2-23.8c5.2,0,11.2,1.9,13,7.8c1,3.2,1,5.8-0.3,8s-4.5,4.3-7,4.4 c-1.6,0-3.1,0-5.9,0c2.5-2.8,5-5.1,6.9-7.2c0.8-0.9,1.3-1.2,1.3-2.4c0.1-1.7-1.8-2.2-3-2.2c-3.6,0-7.5,0-10.8,0 c-1.6,0-2.9,0.7-2.9,2.5s1.7,2.2,2.7,2.3c1.9,0.2,5.8,0.1,5.8,0.1s-4.7,4.7-7.4,7.5c-0.8,0.8-1.7,2.4-0.6,3.4c1.2,1,2.4,0.9,3.2,0.9 c2.8,0,5.8,0.3,8.8,0.1c5.6-0.4,10.3-2.5,11.5-5C114.3,120.5,93.9,123.5,87.2,109.6z"
        ></path>
        <g class="radio_circle" transform="rotate(25.1139 102 102)">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 102 102"
            to="360 102 102"
            dur="3.6s"
            repeatCount="indefinite"
          ></animateTransform>
          <path
            fill="#ffffff"
            d="M139.6,64.2c-9.2-9.2-21.3-13.8-33.3-13.8V59c9.9,0,19.7,3.8,27.3,11.3s11.3,17.4,11.3,27.3h8.5 C153.5,85.5,148.9,73.5,139.6,64.2z"
          ></path>
          <path
            fill="#ffffff"
            d="M106.3,67.6v8.5c5.5,0,11,2.1,15.2,6.3s6.3,9.7,6.3,15.2h8.5c0-7.7-2.9-15.4-8.8-21.2 C121.7,70.5,114,67.6,106.3,67.6z"
          ></path>
        </g>
      </svg>
      <div id="text_mask">
        <h1>4&nbsp;&nbsp;&nbsp;&nbsp;4</h1>
        <p>您访问的网页出错了!</p>
        <i id="home_btn" @click="jumpHome">返回首页</i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const jumpHome = () => {
    // console.log(router.getRoutes())
    router.replace('/')
}

</script>

<style scoped>
.loadingPage {
  background: white no-repeat;
  background-image: -webkit-radial-gradient(
      rgba(225, 225, 225, 0.3) 0%,
      transparent 60%
    ),
    -webkit-linear-gradient(top, rgba(191, 229, 203, 1) 0%, rgba(
            191,
            229,
            203,
            1
          )
          15%, rgba(191, 229, 203, 0) 100%),
    -webkit-linear-gradient(left, rgba(10, 110, 206, 1) 0%, rgba(
            10,
            110,
            206,
            1
          )
          30%, rgba(0, 158, 150, 0.8) 100%);
  background-size: 60% 80%, 100% 100%, 100% 100%;
  background-position: right -30% top -70%;
  z-index: 3000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.loadingPage svg {
  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto;
  margin-top: calc(50vh - 150px);
}
#text_mask {
  font-family: "Open Sans";
  position: fixed;
  top: 50vh;
  left: 50vw;
  width: 320px;
  height: auto;
  color: white;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  text-align: center;
  vertical-align: middle;
}
#text_mask h1 {
  font-weight: normal;
  font-size: 140px;
  line-height: 0.8em;
  padding: 0;
  margin: 0;
  display: inline-block;
  width: auto;
}
#text_mask p {
  font-size: 32px;
  margin: 0;
  margin-top: 16px;
  display: inline-block;
}
#home_btn {
	cursor: pointer;
	display: block;
	width: 280px;
	padding: 8px 0;
	margin: 18px auto;
	border-radius: 8px;
	text-decoration: none;
	color: white;
	border: 1px solid rgba(255, 255, 255, 0.6);
}
</style>