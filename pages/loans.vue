<template>
  <v-container >
    <div class="flex-col">
      <div class="text-5xl pt-10 pb-5 font-bold">Loans</div>
      <div class="text-2xl pb-10 font-bold">All active loans on the platform.</div>
    </div>
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

const loanItems = ref<LoanData[]>([
  {
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
    isLend: true
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
  },{
    loanIndex: '5',
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
  },{
    loanIndex: '6',
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
  },{
    loanIndex: '7',
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
  },{
    loanIndex: '8',
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
  },{
    loanIndex: '9',
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
  },{
    loanIndex: '10',
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
  },{
    loanIndex: '11',
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
  },{
    loanIndex: '12',
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
  },{
    loanIndex: '13',
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

</script>

<style scoped>

</style>
