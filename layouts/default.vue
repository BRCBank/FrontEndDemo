<template>
  <header class="header">
    <nav class="nav">
      <div class="flex">
        <img src="/img/logo.png" class="ml-8 w-[240px]"
             @click="goToPage('/')"/>
        <div class="flex text-center ml-12 items-center justify-center">
          <v-menu
              open-on-hover
          >
            <template v-slot:activator="{ props }">
              <div
                  v-bind="props"
                  class="text-3xl select-none text-[#FFD700]"
                  v-if="route1=='borrow'"
                  @click="goToPage(borrowItems[0].to)"
              >
                Receive a Loan
              </div>
              <div
                  v-bind="props"
                  class="text-3xl select-none"
                  v-else
                  @click="goToPage(borrowItems[0].to)"
              >
                Receive a Loan
              </div>
            </template>

            <v-list>
              <v-list-item
                  v-for="(item, index) in borrowItems"
                  :key="index"
              >
                <NuxtLink class="text-2xl text-[#FFD700]" :to="item.to" v-if="item.to == route.path">{{ item.title }}</NuxtLink>
                <NuxtLink class="text-2xl" :to="item.to" v-else>{{ item.title }}</NuxtLink>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="flex text-center ml-12 items-center justify-center">
          <v-menu
              open-on-hover
          >
            <template v-slot:activator="{ props }">
              <div
                  v-bind="props"
                  class="text-3xl select-none text-[#FFD700]"
                  v-if="route1=='lend'"
                  @click="goToPage(lendItems[0].to)"
              >
                Offer a Loan
              </div>
              <div
                  v-bind="props"
                  class="text-3xl select-none"
                  v-else
                  @click="goToPage(lendItems[0].to)"
              >
                Offer a Loan
              </div>
            </template>

            <v-list>
              <v-list-item
                  v-for="(item, index) in lendItems"
                  :key="index"
              >
                <NuxtLink class="text-2xl  text-[#FFD700]" :to="item.to" v-if="item.to == route.path">{{ item.title }}</NuxtLink>
                <NuxtLink class="text-2xl" :to="item.to" v-else>{{ item.title }}</NuxtLink>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <NuxtLink v-if="route1=='loans'" class="flex text-3xl text-center ml-12 items-center justify-center text-[#FFD700]" to="/loans">
          Loans
        </NuxtLink>
        <NuxtLink v-else class="flex text-3xl text-center ml-12 items-center justify-center" to="/loans">
          Loans
        </NuxtLink>

        <!--        <NuxtLink class="nav-link" to="/">Home</NuxtLink>-->
<!--        <NuxtLink class="nav-link" to="swap">Swap</NuxtLink>-->
<!--        <NuxtLink class="nav-link" to="risk_manager">Risk Manager</NuxtLink>-->
<!--        <NuxtLink class="nav-link" to="admin">Admin</NuxtLink>-->
<!--        <NuxtLink class="nav-link" to="userDashboard">User Dashboard</NuxtLink>-->
      </div>

      <div class="flex items-center justify-center">
        <div v-if="!walletAddress" class="select-none text-center text-3xl p-2 border-2 border-[#FFD700] rounded-[13px] hover:bg-[#FFD700]" @click="connect">ConnectWallet</div>
        <div v-if="walletAddress" class="select-none text-center text-3xl p-2 border-2 border-[#FFD700] rounded-[13px] hover:bg-[#FFD700]" @click="disconnect">{{shortenWallet(walletAddress?.ordinalsAddress)}}</div>
      </div>
    </nav>
  </header>
  <main >
    <slot />
  </main>
  <footer>
    <div class="footer">All Rights Reserved</div>
  </footer>
</template>

<script setup lang="ts">
import {useStore} from "~/store";
import {getAddress, GetAddressOptions, GetAddressResponse} from "sats-connect";
import {fetchContracts, shortenWallet} from "~/utils";

const store = useStore();
const router = useRouter()

const {walletAddress} = storeToRefs(store);
import { signMessage, sendBtcTransaction } from "sats-connect";

const route = useRoute()
const menu = reactive({isOpen: false});

const borrowItems = ref( [
  { title: 'Receive A New Loan', to: '/borrow/assets'},
  { title: 'My Loans', to: '/borrow/loans' }
]);
const lendItems = ref( [
  { title: 'Offer A New Loan', to: '/lend/assets'},
  { title: 'Loans Offered', to: '/lend/loans' }
]);
onMounted(async () => {
  console.log('current name', route.name)
})

const route1 = ref('')
const route2 = ref('')

watch(
    () => route.path,
    () => {
      console.log(1, route.name);
      console.log(2, route.path);
      if(route.path.split('/').length >1)
        route1.value = route.path.split('/')[1];
      else route1.value = '';
      if(route.path.split('/').length >2)
        route2.value = route.path.split('/')[2];
      else route2.value = '';

      console.log(3, route1.value);
      console.log(4, route2.value);
    },
);

const connect = async () => {
  alert('connect clicked');
  const getAddressOptions = {
    payload: {
      purposes: ['ordinals', 'payment'],
      message: 'Address for receiving Ordinals and payments',
      network: {
        type:'Testnet'
      },
    },
    onFinish: (response: GetAddressResponse) => {
      // console.log('yoman',response)
      store.setWalletAddress({
        ordinalsAddress: response.addresses[0].address,
        ordinalsPublicKey: response.addresses[0].publicKey,
        payAddress: response.addresses[1].address,
        payPublicKey: response.addresses[1].publicKey,
      });
      // fetchContracts();
    },
    onCancel: () => alert('Request canceled'),
  }

  await getAddress(<GetAddressOptions>getAddressOptions);

  // walletAddress.value = '0xAB....CD';
}
const disconnect = () => {
  alert('disconnect clicked');
  walletAddress.value = null;
}

const goToPage = (path:string) => {
  router.push({
    path: path
  })};

</script>


<style>
@import "vue-connect-wallet/dist/style.css";

.header {
  background-color: #f8f9fa;
  padding: 5px 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 95vw;
}

.nav-links {
  display: flex;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 1.2em;
  font-weight: bold;
  margin-right: 2rem;
}

.nav-link:last-child {
  margin-right: 0;
}

.wallet-connect {
  align-self: flex-end;
}
.footer {
  text-align: center;
  padding: 20px 0;
  background-color: #f8f9fa;
  color: #333;
  font-size: 0.8em;
  //position: relative;
  width: 100%;
  bottom: 0;
}
</style>
