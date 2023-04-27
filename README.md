# PepeElonMusk Token

1. Чтобы установить зависимости нужно выполнить команду
   `yarn install`

2. Чтобы выложить контракт в Mainnet BSC
   2.1 Сначала прописать актуальные адреса в файле .env
   2.2 Прописать сид-фразу кошелька деплоера в файле secrets.json (есть пример secrets.example.json)
   2.3 Выполнить команду для деплоя:
   `npx hardhat run --network mainnetBSC scripts/deploy.ts`
   При этом в консоли будет выведен адрес только что задеплоенного токена. Скопируйте его.

3. Отправка токена с адреса кошелька на адреса для CEX и Airdrop
   3.1 Адреса кошельков, на которые нужно совершить перевод и количество токенов указываются в файле .env
   3.2 Замените в команде ниже 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX на адрес задеплоенного токена
   3.3 Выполнить команду для отправки:
   `npx hardhat send_tokens --network mainnetBSC --token 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

4. Добавление ликвидности
   4.1 Укажите ликвидность в BNB и адрес Pancake роутера в файле .env
   4.2 Замените в команде ниже 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX на адрес задеплоенного токена
   4.3 Выполнить команду для добавления ликвидности:
   `npx hardhat add_liquidity --network mainnetBSC --token 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   При этом в консоли будет выведен адрес пула ликвидности. Скопируйте его.

5. Установка комиссии
   5.1 Замените в команде ниже 0xTOKENADDRESS на адрес токена, установите размер комиссии (в примере ниже 1.2)
   `npx hardhat set_fee --network testnetBSC --token 0xTOKENADDRESS --fee 1.2`
   > Внимание! До установки комиссии кто угодно может получать токены
6. Добавление в вайтлист
   6.1 Замените в команде ниже 0xTOKENADDRESS на адрес токена, 0xWALLET на адрес кошелька, который надо добавить в вайтлист
   `npx hardhat add_address_to_whitelist --network testnetBSC --token 0xTOKENADDRESS --wallet 0xWALLET`
