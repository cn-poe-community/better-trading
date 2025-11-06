// Vendor
import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

// Types
import ItemResults from 'better-trading/services/item-results';
import IntlService from 'ember-intl/services/intl';
import Bookmarks from 'better-trading/services/bookmarks';
import Storage from 'better-trading/services/storage';
import TradeLocation from 'better-trading/services/trade-location';
import PageTitle from 'better-trading/services/page-title';

// Constants
const DEFAULT_LOCALE = 'en';
const LOCALE_TABLE: { [uiLocale: string]: string } = {
  "zh-CN": "zh-CN",
}

export default class ApplicationRoute extends Route {
  @service('bookmarks')
  bookmarks: Bookmarks;

  @service('intl')
  intl: IntlService;

  @service('item-results')
  itemResults: ItemResults;

  @service('storage')
  storage: Storage;

  @service('trade-location')
  tradeLocation: TradeLocation;

  @service('page-title')
  pageTitle: PageTitle;

  async beforeModel() {
    const uiLocale = navigator.language;
    const locale = LOCALE_TABLE[uiLocale] ?? DEFAULT_LOCALE;
    this.intl.setLocale(locale);

    await this.itemResults.initialize();
    this.tradeLocation.initialize();
    await this.storage.initialize();
    await this.pageTitle.initialize();
  }
}
