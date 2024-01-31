<template>

  <v-container >
    <div class="flex-col">
      <div class="text-5xl pt-10 pb-5 font-bold">Offer loan</div>
      <div class="text-2xl pb-10 font-bold">Offer loans to other users on their BRC-20 tokens.</div>
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
    <v-row >
      <v-col v-for="item in loanItems"
             sm="12"
             lg="6"
             xl="4">
        <LoanItem :loan-index="item.loanIndex" :duration-days="item.durationDays"
                  :interest-rate="item.interestRate" :debt-amount="item.debtAmount"
                  :col-amount="item.colAmount" :col-token="item.colToken"
                  :start-date="item.startDate" :end-date="item.endDate" :is-lend="item.isLend"
                  :borrower-address="item.borrowerAddress" :lender-address="item.lenderAddress" :is-time-over="item?.isTimeOver"></LoanItem>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoanItem from "~/components/LoanItem.vue";
import type {LoanData} from "~/utils";
const router = useRouter();

const tabs = [
  { name: 'newLoan', label: 'Offer Loan', to: '/lend/assets'},
  { name: 'loansGiven', label: 'Loans offered', to: '/lend/loans'},
];
const activeTab = ref(tabs[0].name); // Default to the first tab

const loanItems = ref<LoanData[]>([
  {
    loanIndex: '2',
    borrowerAddress: '0x00...123',
    durationDays: '14',
    interestRate: '10',
    debtAmount: '1',
    colAmount: '100',
    colToken: 'ORDI',
    lenderAddress: '',
    startDate: '',
    endDate: '',
    isLend: true
  },{
    loanIndex: '5',
    borrowerAddress: '0x00...123',
    durationDays: '14',
    interestRate: '10',
    debtAmount: '1',
    colAmount: '100',
    colToken: 'ORDI',
    lenderAddress: '',
    startDate: '',
    endDate: '',
    isLend: true
  },{
    loanIndex: '6',
    borrowerAddress: '0x00...123',
    durationDays: '14',
    interestRate: '10',
    debtAmount: '1',
    colAmount: '100',
    colToken: 'ORDI',
    lenderAddress: '',
    startDate: '',
    endDate: '',
    isLend: true
  },{
    loanIndex: '7',
    borrowerAddress: '0x00...123',
    durationDays: '14',
    interestRate: '10',
    debtAmount: '1',
    colAmount: '100',
    colToken: 'ORDI',
    lenderAddress: '',
    startDate: '',
    endDate: '',
    isLend: true
  },{
    loanIndex: '8',
    borrowerAddress: '0x00...123',
    durationDays: '14',
    interestRate: '10',
    debtAmount: '1',
    colAmount: '100',
    colToken: 'ORDI',
    lenderAddress: '',
    startDate: '',
    endDate: '',
    isLend: true
  }]);


const goToPage = (path:string) => {
  router.push({
    path: path
  })};

</script>

<style scoped>

</style>
