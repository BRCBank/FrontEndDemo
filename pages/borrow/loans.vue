<template>
    <v-container >
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
      <v-row >
        <v-col v-for="item in loanItems"
               sm="12"
               lg="6"
               xl="4">          <LoanItem :loan-index="item.loanIndex" :duration-days="item.durationDays"
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
  { name: 'newLoan', label: 'Receive a new Loan', to: '/borrow/assets'},
  { name: 'loansGiven', label: 'My Loans', to: '/borrow/loans'},
];
const activeTab = ref(tabs[1].name); // Default to the first tab

const loanItems = ref<LoanData[]>([
    {
  loanIndex: '1',
  borrowerAddress: '0x00...123',
  durationDays: '14',
  interestRate: '10',
  debtAmount: '1',
  colAmount: '100',
  colToken: 'ORDI',
  lenderAddress: '',
  startDate: '',
  endDate: '',
  isLend: false
},{
  loanIndex: '3',
  borrowerAddress: '0x00...123',
  durationDays: '14',
  interestRate: '10',
  debtAmount: '1',
  colAmount: '100',
  colToken: 'ORDI',
  lenderAddress: '0x00...234',
  startDate: '2024-02-01',
  endDate: '2024-02-14',
  isLend: false
},{
  loanIndex: '4',
  borrowerAddress: '0x00...123',
  durationDays: '14',
  interestRate: '10',
  debtAmount: '1',
  colAmount: '100',
  colToken: 'ORDI',
  lenderAddress: '0x00...234',
  startDate: '2024-02-01',
  endDate: '2024-02-14',
  isLend: true
},]);

const goToPage = (path:string) => {
  router.push({
    path: path
  })};
</script>

<style scoped>

</style>
