
import * as puppeteer from 'puppeteer';
import { newInjectedPage } from 'fingerprint-injector';

import { ResourceData } from '../ConcurrencyImplementation';
import SingleBrowserImplementation from '../SingleBrowserImplementation';

export default class Page extends SingleBrowserImplementation {

    protected async createResources(): Promise<ResourceData> {
        return {
            page: await newInjectedPage(this.browser as puppeteer.Browser, {
                // constraints for the generated fingerprint
                fingerprintOptions: {
                    devices: ["mobile"],
                    operatingSystems: ["ios"],
                },
            }),
        };
    }

    protected async freeResources(resources: ResourceData): Promise<void> {
        await resources.page.close();
    }

}
