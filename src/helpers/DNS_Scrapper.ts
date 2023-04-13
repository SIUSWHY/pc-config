import { Page } from 'puppeteer';
import sleep from './sleep';
import fs from 'fs';

async function DnsShopScrapper(page: Page) {
  let dataOnPages: object[] = [];

  const urls = [
    'https://www.dns-shop.ru/catalog/17a899cd16404e77/processory/',
    'https://www.dns-shop.ru/catalog/17a89a0416404e77/materinskie-platy/',
    'https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/',
    'https://www.dns-shop.ru/catalog/17a89a3916404e77/operativnaya-pamyat-dimm/',
    'https://www.dns-shop.ru/catalog/17a89c2216404e77/bloki-pitaniya/',
  ];
  const category = ['cpu', 'motherboard', 'graphic-card', 'orm', 'energy-block'];

  for (let url of urls) {
    for (let numPage = 1; ; numPage++) {
      await page.goto(`${url}?p=${numPage}`);

      await page.setViewport({ width: 1080, height: 1024 });

      if (numPage === 2) {
        const dataForFile = JSON.stringify(dataOnPages, null, 2);
        fs.writeFileSync(`./mocks/dns/${category[urls.indexOf(url)]}/${numPage}.json`, dataForFile);
        dataOnPages = [];
        break;
      }

      const cards = await page.waitForSelector('[data-code] > a');
      if (!cards) {
        const temp = JSON.stringify(dataOnPages, null, 2);
        fs.writeFileSync(`./mocks/dns/${category[urls.indexOf(url)]}/${numPage}.json`, temp);
        dataOnPages = [];
        break;
      }

      const arrHref = await page.$$eval('[data-code] > a', arrElementsents => {
        return arrElementsents.map(arrElementsent => arrElementsent.href);
      });
      // console.log(arrHref);

      for (const href of arrHref) {
        if (arrHref.length === 0) {
          const temp = JSON.stringify(dataOnPages, null, 2);
          fs.writeFileSync(`./mocks/dns/${category[urls.indexOf(url)]}/${numPage}.json`, temp);
          dataOnPages = [];
          break;
        }

        await page.goto(href);

        await page.waitForSelector('.button-ui.button-ui_white.product-characteristics__expand');
        await page.click('.button-ui.button-ui_white.product-characteristics__expand');
        await sleep(2500);

        switch (category[urls.indexOf(url)]) {
          case 'cpu':
            const arrCPU = await page.$$eval('.product-characteristics__spec-value', async arrElements => {
              const price = document.querySelector('.product-buy__price')?.textContent;

              const isValid = arrElements[2].textContent?.trim().includes('AMD' || 'Intel' || '\n\tIntel' || '\n\tAMD');
              console.log(isValid);

              if (isValid) {
                return {
                  model: arrElements[2].textContent ? arrElements[2].textContent?.trim() : ' ',
                  socket: arrElements[3].textContent ? arrElements[3].textContent?.trim() : ' ',
                  memoryType: arrElements[21].textContent ? arrElements[21].textContent?.trim() : ' ',
                  price: price ? parseInt(price.replaceAll(' ', '')) : 'error',
                  shopBrand: 'DNS',
                  message: 'correct',
                };
              } else {
                return {
                  model: arrElements[1].textContent ? arrElements[1].textContent?.trim() : ' ',
                  socket: arrElements[2].textContent ? arrElements[2].textContent?.trim() : ' ',
                  memoryType: arrElements[20].textContent ? arrElements[20].textContent?.trim() : ' ',
                  price: price ? parseInt(price.replaceAll(' ', '')) : 'error',
                  shopBrand: 'DNS',
                  message: 'error',
                };
              }
            });
            console.log(arrCPU);
            dataOnPages.push({ ...arrCPU, href });
            break;

          case 'motherboard':
            const arrMotherboard = await page.$$eval('.product-characteristics__spec-value', async arrElements => {
              const price = document.querySelector('.product-buy__price')?.textContent;

              return {
                model: arrElements[3].textContent ? arrElements[3].textContent?.trim() : ' ',
                socket: arrElements[7].textContent ? arrElements[7].textContent?.trim() : ' ',
                memoryType: arrElements[12].textContent ? arrElements[12].textContent?.trim() : ' ',
                price: price ? parseInt(price.replaceAll(' ', '')) : 'error',
                shopBrand: 'DNS',
              };
            });
            console.log(arrMotherboard);
            dataOnPages.push({ ...arrMotherboard, href });
            break;

          case 'graphic-card':
            const arrGraphicCard = await page.$$eval('.product-characteristics__spec-value', async arrElements => {
              const price = document.querySelector('.product-buy__price')?.textContent;

              return {
                model: arrElements[3].textContent ? arrElements[3].textContent?.trim() : ' ',
                memorySize: arrElements[11].textContent ? arrElements[11].textContent?.trim() : ' ',
                memoryType: arrElements[12].textContent ? arrElements[12].textContent?.trim() : ' ',
                powerUnit: arrElements[32].textContent ? arrElements[32].textContent?.trim() : ' ',
                price: price ? parseInt(price.replaceAll(' ', '')) : 'error',
                shopBrand: 'DNS',
              };
            });
            console.log(arrGraphicCard);
            dataOnPages.push({ ...arrGraphicCard, href });
            break;

          case 'orm':
            const arrORM = await page.$$eval('.product-characteristics__spec-value', async arrElements => {
              const price = document.querySelector('.product-buy__price')?.textContent;

              return {
                model: arrElements[3].textContent ? arrElements[3].textContent?.trim() : ' ',
                memoryType: arrElements[4].textContent ? arrElements[4].textContent?.trim() : ' ',
                memorySize: arrElements[7].textContent ? arrElements[7].textContent?.trim() : ' ',
                price: price ? parseInt(price.replaceAll(' ', '')) : 'error',
                shopBrand: 'DNS',
              };
            });
            console.log(arrORM);
            dataOnPages.push({ ...arrORM, href });  
            break;

          case 'energy-block':
            const arrEnergyBlock = await page.$$eval('.product-characteristics__spec-value', async arrElements => {
              const price = document.querySelector('.product-buy__price')?.textContent;

              return {
                model: arrElements[3].textContent ? arrElements[3].textContent?.trim() : ' ',
                power: arrElements[5].textContent ? arrElements[5].textContent?.trim() : ' ',
                price: price ? parseInt(price.replaceAll(' ', '')) : 'error',
                shopBrand: 'DNS',
              };
            });
            console.log(arrEnergyBlock);
            dataOnPages.push({ ...arrEnergyBlock, href });
            break;
        }
      }

      const temp = JSON.stringify(dataOnPages, null, 2);
      fs.writeFileSync(`./mocks/dns/${category[urls.indexOf(url)]}/${numPage}.json`, temp);

      console.log('dataOnPage', dataOnPages);
    }
  }
}

export default DnsShopScrapper;
