<template>
  <v-container>
    <div class="flex-col">
      <div class="text-5xl pt-10 pb-5 font-bold">Receive loan</div>
      <div class="text-2xl pb-10 font-bold">Choose the BRC20 token you would like to receive Loan on. </div>
    </div>
    <v-tabs
        v-model="activeTab"
        show-arrows
        class="mb-5"
    >
      <v-tab
          v-for="tabItem in tabs"
          :key="tabItem.name"
          :value="tabItem.name"
          @click="goToPage(tabItem.to)"
          size="large"
      >
        {{tabItem.label}}
      </v-tab >
    </v-tabs>
    <div class="flex items-center justify-center">
      <v-card class="pa-4 w-[800px]" color="#fefdf5">
        <div class="text-5xl mb-10 text-center"> List BRC-20 to get Loan</div>
        <v-select
            v-model="loanFormData.tokenType"
            :items="tokenTypes"
            label="BRC20 Token"
            outlined
            dense>
        </v-select>
        <v-text-field v-model="loanFormData.tokenAmount" label="BRC20 Amount" type="number" outlined dense></v-text-field>
        <v-text-field v-model="loanFormData.loanAmount" label="Borrow Amount(BTC)" type="number" outlined dense></v-text-field>
        <v-text-field v-model="loanFormData.interestRate" label="Interest Rate (%)" type="number" outlined dense></v-text-field>
        <v-text-field v-model="loanFormData.duration" label="Duration (days)" type="number" outlined dense></v-text-field>
        <v-btn class="w-full bg-black h-auto" @click="listForLoan"><div class="text-3xl m-2"> List</div></v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useStore} from "~/store";
import type {LoanRequestData} from "~/utils";
import {signMessageAndEnqueueTransaction} from "~/utils";

const store = useStore();
const {walletAddress} = storeToRefs(store);

const loanFormData = ref<LoanRequestData>({
  tokenType: 'ORDI',
  tokenAmount: 0,
  loanAmount: 0,
  interestRate: 4,
  duration: 7,
});
const router = useRouter();
const tabs = [
  { name: 'newLoan', label: 'Receive a new Loan', to: '/borrow/assets'},
  { name: 'loansGiven', label: 'My Loans', to: '/borrow/loans'},
];
const activeTab = ref(tabs[0].name); // Default to the first tab

const tokenTypes = ['ORDI', 'SATS', 'MUBI']; // Token Lists

const listForLoan = async () => {
  await signMessageAndEnqueueTransaction(
      {
        action:'list',
        user: walletAddress.value.ordinalsAddress,
        data: loanFormData.value,
      });
}

const goToPage = (path:string) => {
  router.push({
    path: path
  })};
</script>

<style scoped>

</style>
