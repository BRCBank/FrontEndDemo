<template>
  <div class="m-0 p-0" >
    <div class="epoch-page w-full h-screen items-center flex justify-center" >
      <div class="flex-col items-center justify-center">
        <div class="text-white text-8xl text-center">Innovating</div>
        <div class="text-white text-8xl text-center mb-14">BRC-20 Lending</div>
        <div class="text-white text-5xl text-center mb-8">Find out more for early access.</div>
        <div class="flex items-center justify-center " >
          <div class="bg-[#FFFFFF] hover:bg-[#FFD700] rounded-[4px] text-3xl text-center w-[300px] p-3 select-none" @click="openInNewTab('https://forms.gle/uGMgqTo5GqGviYVMA')">I'M INTERESTED</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const config = useRuntimeConfig()
const currentEpoch = ref('');
const currentTotalSupply = ref('');
const currentTotalAsset = ref('');

const v = ref('');
let vaultManager = null;
let web3Manager = null;
console.log('Runtime config:', config)

onMounted(async () => {
  // const web3 = createWeb3Instance();
  // const accounts = await web3.eth.getAccounts();
  // console.log(accounts[0]); // 사용자의 계정 주소 출력
  // web3Manager = new Web3Manager(web3, config);
  // // vaultManager = new VaultManager(web3, config.public.vaultContract, config.public.zusdContract);
  // web3Manager.getCurrentEpoch().then((epoch) => {
  //   currentEpoch.value = epoch;
  // });
  //
  // const zUSDSupply = await web3Manager.zUSDTotalSupply();
  // currentTotalSupply.value = new BigNumber(zUSDSupply).dividedBy(10**ZUSD_DECIMAL).toFixed(3);
  // currentTotalAsset.value = new BigNumber(zUSDSupply).dividedBy(10**ZUSD_DECIMAL).multipliedBy(1.0 + Math.random() * 0.05).toFixed(3);
  // Here you will call the getCurrentEpoch function and assign the result to currentEpoch value
});


const openInNewTab = (url) => {
  window.open(url, '_blank', 'noreferrer');
}
</script>


<style scoped>
.epoch-page {
  background-image: url("/img/landing.png");
  background-size: cover;
  background-color: #F5EEC2FF;
}
</style>
